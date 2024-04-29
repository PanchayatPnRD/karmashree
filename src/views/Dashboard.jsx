import { DashboardNavbar } from "../components/DashboardNavbar";
import { Sidebar } from "../components/Sidebar";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { Footer } from "../components/Footer";

const Dashboard = ({ children }) => {
  return (
    <>
      <DashboardNavbar />

      <div className="flex">
        <div className="w-1/4 xl:w-1/5 hide inset-y-0 top-[98px] min-h-remaining bg-blue-950 fixed overflow-y-auto">
          <Sidebar />
        </div>

        <div className=" min-h-remaining w-[75vw] xl:w-[80vw] ml-[25vw] xl:ml-[20vw] flex flex-col shadow-xl bg-white">
          {children}

          <Footer className="justify-items-end" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
