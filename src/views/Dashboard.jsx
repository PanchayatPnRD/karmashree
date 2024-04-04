import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
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
      <div className="px-8 shadow-lg">
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
      </div>
      <Sidebar className="flex flex-col flex-grow">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
              <Sidebar.Item href="#">Products</Sidebar.Item>
              <Sidebar.Item href="#">Sales</Sidebar.Item>
              <Sidebar.Item href="#">Refunds</Sidebar.Item>
              <Sidebar.Item href="#">Shipping</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <Footer />
    </>
  );
};

export default Dashboard;
