import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { DashboardNavbar } from "../components/DashboardNavbar";
import gif from "/dribbble_1.gif";

const Error404 = () => {
  const { pathname } = useLocation();

  const dashboardRegex = /^\/dashboard/;

  if (dashboardRegex.test(pathname))
    return (
      <>
        <DashboardNavbar />
        <div className=" text-3xl min-h-remaining flex justify-center items-center">
          <div className="h-[600px] min-w-[800px] bg-error flex flex-col items-center justify-between py-20">
            <span className="font-base text-8xl text-zinc-600">404</span>
            <div className="flex flex-col items-center space-y-4">
              <span className="text-md">Looks like your'e lost</span>
              <span className="text-sm">
                The page your'e looking for isn't available
              </span>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Navbar />
      <div className=" text-3xl min-h-remaining flex justify-center items-center">
        <div className="h-[600px] min-w-[800px] bg-error flex flex-col items-center justify-between py-20">
          <span className="font-base text-8xl text-zinc-600">404</span>
          <div className="flex flex-col items-center space-y-4">
            <span className="text-md">Looks like your'e lost</span>
            <span className="text-sm">
              The page your'e looking for isn't available
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
