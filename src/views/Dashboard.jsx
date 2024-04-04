import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Karmashree_logo } from "../components/Logo";
import { Footer } from "../components/Footer";
// import Sidebar from "../common/layout/Sidebar";
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
    <>
      <div className="px-8 shadow-lg flex-col flex sticky top-0 left-0 z-50">
        <Navbar className="bg-transparent">
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
        </Navbar>

        <div></div>
      </div>
      <Sidebar />
      {/* <div className="h-remaining"></div> */}
      <Footer />
    </>
  );
};

export default Dashboard;
