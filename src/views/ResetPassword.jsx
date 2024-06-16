import { Login_logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import classNames from "classnames";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState, useRef, Fragment, useEffect } from "react";
import { useStack } from "../functions/Stack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getPasswordReset,
  getVerifyOtpResetPassword,
  getNewPasswordGenerate,
} from "../../src/Service/LoginService";

export const ConfirmUser = () => {
  const [userId, setUserId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState(null);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { stack } = useStack();

  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);
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

  function handleSubmit() {
    if (showOtp) navigate("/reset", { state: "verify" });
    else setShowOtp(true);
  }
  if (state != "login") return <Navigate to={stack[0]} />;
  if (state != "reset") return <Navigate to={stack[0]} />;

  function onVerifyUser() {
    if (userId === "") {
      toast.error("Please type your user id");
    } else if (phoneNumber.length != 10) {
      toast.error("Please type 10 digit mobile number");
    } else {
      getPasswordReset(userId, phoneNumber, (res) => {
        if (res.errorCode == 0) {
          const userdata = {
            UserID: userId,
          };
          localStorage.setItem("karmashree_User", JSON.stringify(userdata));
          setShowOtp(true);
          toast.success(res.message);
        } else if (res.errorCode == 1) {
          toast.error(res.message);
        } else {
        }
      });
    }
  }

  const onOtpVerify = () => {
    getVerifyOtpResetPassword(otp.join(""), userData?.UserID, (res) => {
      if (res.errorCode == 0) {
        toast.success(res.message);

        navigate("/reset", { state: "verify" });

        // window.location.reload();
      } else if (res.errorCode == 1) {
        toast.error(res.message);
      } else {
      }
    });
  };

  const onUserId = (e) => {
    setUserId(e.target.value);
  };

  const onPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  return (
    <>
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
            <div className="flex flex-col justify-evenly min-h-[424px] capitalize">
              <h1 className="font-bold text-2xl">
                {!showOtp ? "verify yourself" : "enter otp"}
              </h1>
              <div className="flex flex-col space-y-6 h-48">
                {showOtp ? (
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
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          className="caret-transparent size-10 bg-gray-50 rounded-md text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        Enter your User Id
                      </label>
                      <input
                        type="text"
                        placeholder="type your User Id"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        onChange={onUserId}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        Enter your Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="type your User Id"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        onChange={onPhoneNumber}
                      />
                    </div>
                  </>
                )}
              </div>
              <button
                className={classNames(
                  "capitalize text",
                  "tracking-wider",
                  "text-white rounded-md py-4",
                  "bg-blue-500 hover:bg-blue-500/90"
                )}
                onClick={!showOtp ? onVerifyUser : onOtpVerify}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer bg={"bg-zinc-50"} />
    </>
  );
};

export const ResetPassword = () => {
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { stack } = useStack();
  const navigate = useNavigate();
  const { state } = useLocation();
  if (state != "verify") return <Navigate to={stack[0]} />;

  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);
  }, []);

  const onNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onResetPassword = () => {
    if (
      !newPassword.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/
      )
    ) {
      toast.error(
        "Password must contain at least 6 characters and max 8 characters, including uppercase, lowercase, and special characters."
      );
    } else if (confirmPassword === "") {
      toast.error("Please type your confirm password");
    } else if (newPassword != confirmPassword) {
      toast.error("New password and confirm password should be same");
    } else {
      getNewPasswordGenerate(
        userData?.UserID,
        newPassword,
        confirmPassword,
        (res) => {
          if (res.errorCode == 0) {
            toast.success(res.message);
            navigate("/login");
          } else if (res.errorCode == 1) {
            toast.error(res.message);
          } else {
          }
        }
      );
    }
  };
  return (
    <>
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
            <div className="flex flex-col justify-evenly min-h-[424px] capitalize">
              <h1 className="font-bold text-2xl">Reset password</h1>
              {/* <div className="flex flex-col space-y-6 h-48"> */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter New Password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={onNewPassword}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Confirm Password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={onConfirmPassword}
                  />
                </div>
              </div>
              {/* </div> */}
              <button
                className={classNames(
                  "capitalize text",
                  "tracking-wider",
                  "text-white rounded-md py-4",
                  "bg-blue-500 hover:bg-blue-500/90"
                )}
                // onClick={() => navigate("/login", { state: "reset" })}
                onClick={onResetPassword}
              >
                Reset password
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer bg={"bg-zinc-50"} />
    </>
  );
};
