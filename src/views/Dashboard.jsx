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
      {/* <div className="px-8 shadow-lg sticky top-0 left-0 z-50"> */}
      <Navbar />
      {/* <Navbar className="bg-transparent">
          <Navbar.Brand>
            <Karmashree_logo className="fill-blue-600 h-16 w-fit" />
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Icon
                  icon="solar:user-circle-bold-duotone"
                  className="text-5xl text-zinc-400"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </Navbar> */}
      {/* </div> */}
      <div className="h-remaining z-10 flex">
        <div className="w-1/5 border">
          <Sidebar />
        </div>
          {/* <div className="bg-white shadow-md flex-grow"> */}
        <div className="flex-grow border flex flex-col p-2 px-6">

          <div className="flex justify-center items-center flex-grow">
            <span className="text-bold text-5xl font-semibold text-zinc-700">
              Home Pages body
            </span>
          </div>
          <Footer className="justify-items-end" />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
