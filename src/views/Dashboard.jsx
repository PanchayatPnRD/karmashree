import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { Footer } from "../components/Footer";

const Dashboard = ({ children, text }) => {
  return (
    <>
      <Navbar />

      <div className="flex bg-cyan-50">
        <div className="w-1/4 xl:w-1/5 inset-y-0 top-[98px] min-h-remaining bg-blue-950 fixed overflow-y-auto">
          <Sidebar />
        </div>

        <div className=" ml-[26vw] m-4 xl:ml-[21vw] flex flex-col shadow-xl bg-white">
          {children}

          <Footer className="justify-items-end" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
