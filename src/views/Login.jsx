import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Footer } from "../components/Footer";
import { Login_logo } from "../components/Logo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getLogin } from "../Service/LoginService";
const Login = () => {
  const [UserID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();

  const onSubmit = () => {
    if (UserID === "") {
      toast.error("Please type your User Id");
    } else if (password === "") {
      toast.error("Please type your Password");
    } else {
      getLogin(UserID, password, (res) => {
        console.log(res, "response");
        if (res.errorCode == 0) {
          const userdata = {
            // category: res?.result?.category,
            // departmentNo: res?.result?.departmentNo,
            // districtcode: res?.result?.districtcode,
            // subDivision:res?.result?.subDivision,
            // blockCode:res?.result?.blockCode,
            // userIndex: res?.result?.userIndex,
            UserID:UserID
          };

          // localStorage.setItem("karmashree_AuthToken", res.result.token);
          localStorage.setItem("karmashree_User", JSON.stringify(userdata));

          toast.success(res.message);
          navigate("/otp",{state:"login"});
          // window.location.reload();
        } else if (res.errorCode == 1) {
          console.log("nononononono");
          toast.error(res.message);
        } else {
        }
      });
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

          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 ">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In
              </h2>

              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    User Id
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your User Id"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setUserID(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-1 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative flex justify-between border-black focus-within:border-blue-600 overflow-hidden focus-within:ring-blue-600 focus-within:ring-1 rounded-lg border bg-transparent pr-4 text-black outline-none">
                    <input
                      type={isPassword ? "password" : "text"}
                      placeholder="Enter password"
                      className="focus:ring-0 border-0 flex-grow py-4"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-3xl text-zinc-500"
                      onClick={() => setIsPassword((prev) => !prev)}
                    >
                      {isPassword ? (
                        <Icon icon={"iconamoon:eye-light"} />
                      ) : (
                        <Icon icon={"iconamoon:eye-off-light"} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white bg-blue-600 transition hover:bg-opacity-90"
                    onClick={onSubmit}
                  >
                    Log in
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <Link to={"/verify"} state={"login"}>
                    <p className="text-red-600">Forgot Password ?</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer bg={"bg-zinc-50"} />
    </>
  );
};

export default Login;
