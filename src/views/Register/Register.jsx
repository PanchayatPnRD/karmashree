import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { Routes, Route } from "react-router-dom";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { Footer } from "../../components/Footer";

const Register = () => {
  return (
    <div>
      <Navbar />

      <div className="h-remaining z-10 flex bg-zinc-100">
        <div className="w-[25%] h-remaining">
          <Sidebar />
        </div>

        <div className="flex-grow flex flex-col m-4 mx-8 shadow-xl bg-white">
        <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                   Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    //   onChange={onUserID}
                    />

                    <span className="absolute right-2 top-4">
                    
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    //   onChange={onPassword}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  {/* <button
                    type="button"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white bg-blue-600 transition hover:bg-opacity-90"
                    onClick={onSubmit}
                  /> */}

                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white bg-blue-600 transition hover:bg-opacity-90"
                    // onClick={onSubmit}
                  >
                    Submit
                  </button>

                </div>

                <div className="mt-6 text-center">
                  <Link>
                    <p className="text-red-600">Forgot Password ?</p>
                  </Link>
                </div>
              </form>

          <Footer className="justify-items-end" />
        </div>
      </div>
    </div>
  );
};

export default Register;
