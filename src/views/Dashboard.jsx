import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Karmashree_logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";

const Dashboard = () => {
  return (
    <div className="">
      <Navbar />

      <div className="h-remaining z-10 flex bg-zinc-100">
        <div className="w-1/5 border">
          <Sidebar />
        </div>

        <div className="flex-grow flex flex-col m-4 mx-8 shadow-xl bg-white">
          <div className="flex justify-center items-center flex-grow">
            <span className="text-bold text-5xl font-semibold text-zinc-700">
              Home Pages body
            </span>
          </div>
          <Footer className="justify-items-end" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
