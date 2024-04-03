import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Login_logo } from "../components/Logo";

const Login = () => {
  return (
    <>
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

                  <form>
                    <div className="mb-4">
                      <label className="mb-2.5 capitalize block font-medium text-black dark:text-white">
                        Username
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Enter Username"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <input
                        type="submit"
                        value="Sign In"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white bg-blue-600 transition hover:bg-opacity-90"
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <Link>
                        <p className="text-red-600">Forgot Password ?</p>
                      </Link>
                    </div>
                  </form>
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
