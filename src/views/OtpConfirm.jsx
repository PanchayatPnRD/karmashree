import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Login_logo } from "../components/Logo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPConfirm = () => {
  
  const navigate = useNavigate();

  
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
            
          </div>
        </div>
      </div>
      <Footer bg={"bg-zinc-50"} />
    </>
  );
};

export default OTPConfirm;
