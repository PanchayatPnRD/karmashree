import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Login_logo } from "../components/Logo";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Toast } from "flowbite-react";

const Login = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (username.length > 0 && password.length > 0) navigate("/dashboard");
    else setShowToast(true);
  }

  return (
    <>
      {showToast && (
        <Toast className="fixed top-32 right-6 z-50 bg-red-400">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-900">
            <Icon icon="bi:exclamation" className="text-xl" />
          </div>
          <div className="ml-3 text-white text-lg font-semibold">
            Required fields missing
          </div>
          <Toast.Toggle onDismiss={() => setShowToast((prev) => !prev)} />
        </Toast>
      )}

      <div className="flex flex-col h-remaining justify-between">
        <main className="flex-grow">
          <div className="rounded-sm bg-zinc-50 py-20 px-60">
            <div className="flex items-center rounded-xl shadow-2xl bg-white p-8 py-12">
              <div className="hidden w-full xl:block xl:w-1/2">
                <div className="py-17.5 text-center">
                  <span className="mt-15 inline-block">
                    <Login_logo />
                  </span>
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <div className="w-full p-4 ">
                  <h2 className="mb-9 text-4xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Sign In to Karmashree
                  </h2>

                  {/* <form> */}
                  <div className="mb-4">
                    <label className="mb-2.5 capitalize block font-medium text-black dark:text-white">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter Username"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white bg-blue-600 transition hover:bg-opacity-90"
                      onClick={handleSubmit}
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <Link>
                      <p className="text-red-600">Forgot Password ?</p>
                    </Link>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer bg={"bg-zinc-50"} />
      </div>
    </>
  );
};

export default Login;
