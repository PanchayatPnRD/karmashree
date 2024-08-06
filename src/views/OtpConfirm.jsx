import { useState, useRef, Fragment, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Login_logo } from "../components/Logo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames";
import { getVerifyOtp } from "../Service/Otp/otpService";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { devApi } from "../WebApi/WebApi";
import { useStack } from "../functions/Stack";
import SuccessModal from "../components/SuccessModal";
import CryptoJS from "crypto-js";

const OTPConfirm = () => {
  const secretKey = import.meta.env.VITE_secret_key;

  const { stack } = useStack();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(59);
  const [isValidating, setIsValidating] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openModal, setOpenModal] = useState();

  useEffect(() => {
    

    const jsonString = sessionStorage.getItem("karmashree_User");
    const userData = JSON.parse(jsonString);
    setUserData(userData);
  }, []);
  
  const handleOtpChange = (index, value) => {
    // Only allow numeric input
    if (value.match(/^[0-9]$/)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      
      setOtp(updatedOtp);

      // Auto-focus the next input field
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, event) => {
    // Clear the current input field when the user presses the backspace key
    if (event.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);

      // Move to the previous input field
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const encryptedData = CryptoJS.AES.encrypt(
    {
      userId: CryptoJS.AES.encrypt(userData?.UserID, secretKey).toString(),
      otp: CryptoJS.AES.encrypt(otp.join(""), secretKey).toString(),
    },
    secretKey
  ).toString();

  const {
    data: mutationData,
    isSuccess,
    mutate,
  } = useMutation({
    mutationKey: ["otpVerify"],
    mutationFn: async () => {
      const api = axios.create({
        baseURL: devApi,
        headers: { "x-api-key": import.meta.env.VITE_X_API_KEY },
      });

      const data = await api.post(
        `/api/auth/verify-otp`,
        {
          userId: CryptoJS.AES.encrypt(userData?.UserID, secretKey).toString(),
          otp: CryptoJS.AES.encrypt(otp.join(""), secretKey).toString(),
        },
        {}
      );
      return data.data;
    },
    onSuccess: (data) => {
      // const { category}Payload

      sessionStorage.setItem(
        "karmashree_User",
        JSON.stringify(data?.newPayload)
      );
      sessionStorage.setItem("karmashree_AuthToken", data?.newPayload?.token);

      if (
        sessionStorage.getItem("karmashree_AuthToken") != "" ||
        sessionStorage.getItem("karmashree_AuthToken") != undefined
      )
        if (data?.errorCode == 0) {
          navigate("/dashboard");
        } else toast.error(data?.message);
    },
  });
  
  const {
    data: NewOTP,
    isSuccess: resendSuccess,
    mutate:resend_OTP,
  } = useMutation({
    mutationKey: ["resendOTP"],
    mutationFn: async () => {
      const api = axios.create({
        baseURL: devApi,
        headers: { "x-api-key": import.meta.env.VITE_X_API_KEY },
      });

      const data = await api.post(`/api/auth/resend-otp`, {
        token: JSON.parse(sessionStorage.getItem("resendToken")),
      });
      return data.data;
    },
    onSuccess: (data) => {
      // const { category}Payload

     toast.success("Resent OTP Successfully")
    },
  });

  function resendOTP() {
    setTimeLeft(59);
    setIsValidating(true);
    resend_OTP()
    //resend otp function login here
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      setIsValidating(false);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (state != "login") return <Navigate to={stack[0]} />;

  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={"You Need to change your password first"}
        toverify="login"
        // resetData={resetData}
        isSuccess={true}
      />
      <ToastContainer />
      <div className="rounded-sm bg-zinc-50 py-20 px-60 flex-grow">
        <div className="flex items-center rounded-xl shadow-2xl bg-white p-8">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 text-center">
              <span className="mt-15 inline-block">
                <Login_logo />
              </span>
            </div>
          </div>

          <div className="w-full xl:w-1/2 min-h-[424px]">
            <div className="flex flex-col justify-evenly min-h-[424px]">
              <h1 className="font-bold text-2xl tracking-tight">
                OTP verification
              </h1>
              <div className="flex space-x-2 flex-grow max-h-48 justify-center items-center">
                {otp.map((digit, index) => (
                  <Fragment key={index}>
                    {index === 2 && (
                      <div className="w-4 text-center text-2xl">-</div>
                    )}
                    <input
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      className="caret-transparent size-10 bg-gray-50 rounded-md text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Fragment>
                ))}
              </div>
              <div className="text-end text-zinc-600">
                Resend OTP in {timeLeft}s
              </div>
              <button
                className={classNames(
                  "capitalize text",
                  "tracking-wider",
                  "text-white rounded-md py-4",
                  isValidating
                    ? "bg-blue-500 hover:bg-blue-500/90"
                    : "bg-red-500 hover:bg-red-500/90"
                )}
                onClick={isValidating ? mutate : resendOTP}
              >
                {isValidating ? "Validate OTP" : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer bg={"bg-zinc-50"} />
    </>
  );
};

export default OTPConfirm;
