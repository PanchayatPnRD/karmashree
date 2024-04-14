import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { DashboardNavbar } from "../components/DashboardNavbar";
const Error404 = () => {
  const { pathname } = useLocation();

  const dashboardRegex = /^\/dashboard/;

  if (dashboardRegex.test(pathname))
    return (
      <>
        <DashboardNavbar />
        <div className="text-3xl min-h-remaining flex justify-center bg-black items-center divide-x-2 divide-zinc-500">
          <span className="px-6 font-bold text-zinc-600">404</span>
          <span className="px-6 text-xl">This page could not be found</span>
        </div>
      </>
    );
  return (
    <>
      <Navbar />
      <div className="text-3xl min-h-remaining flex justify-center items-center divide-x-2 divide-zinc-500">
        <span className="px-6 font-bold text-zinc-600">404</span>
        <span className="px-6 text-xl">This page could not be found</span>
      </div>
    </>
  );
};

export default Error404;
