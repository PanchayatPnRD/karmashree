import { Login_logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import classNames from "classnames";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState, useRef, Fragment } from "react";
import { useStack } from "../functions/Stack";

export const ConfirmUser = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { stack} = useStack();
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
    if (showOtp) navigate("/reset", {state : "verify"});
    else setShowOtp(true);
  }
  if (state != "login") return <Navigate to={stack[0]} />;

  return (
    <>
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
                onClick={handleSubmit}
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
  const { stack } = useStack()
  const navigate = useNavigate()
  const { state } = useLocation();
  if (state != "verify") return <Navigate to={stack[0]} />;
  return (
    <>
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
              <div className="flex flex-col space-y-6 h-48"></div>
              <button
                className={classNames(
                  "capitalize text",
                  "tracking-wider",
                  "text-white rounded-md py-4",
                  "bg-blue-500 hover:bg-blue-500/90"
                )}
                onClick={()=>navigate("/login",{state : "reset"})}
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
