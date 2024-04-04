import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { Footer } from "../components/Footer";

const Dashboard = ({children,text}) => {
  return (
    <>
      <Navbar />

      <div className="h-remaining z-10 flex bg-zinc-100">
        <div className="w-[25%] h-remaining">
          <Sidebar />
        </div>

        <div className="flex-grow flex flex-col m-4 mx-8 shadow-xl bg-white">
          <div className="flex justify-center items-center flex-grow">
            <span className="text-bold text-5xl font-semibold text-zinc-700">
              {text}
            </span>
          </div>

          <Footer className="justify-items-end" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
