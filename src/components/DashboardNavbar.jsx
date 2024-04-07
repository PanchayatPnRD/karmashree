import { Karmashree_logo } from "./Logo";
import emblem from "/assets/logo/biswa.png";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "./Dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";

export const DashboardNavbar = () => {
  function handleItemClick(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  const navigate = useNavigate();
  return (
    <>
      <div className="p-4 px-16 flex justify-between border items-center sticky top-0 left-0 z-50 bg-white shadow-lg">
        <Link to={"/"} className="flex items-center space-x-2 w-fit">
          <div className="flex">
            <Karmashree_logo className="fill-blue-600 h-14 w-fit" />
            <img src={emblem} alt="" className="h-16" />
          </div>
          <div className="flex flex-col -space-y-1">
            <h1 className="capitalize font-semibold text-2xl tracking-tight">
              department of panchayet & rural development
            </h1>
            <h3 className="capitalize text-zinc-500">
              government of west bengal
            </h3>
          </div>
        </Link>

        <Dropdown
          Button={
            <Icon
              className="text-5xl"
              icon="lets-icons:user-cicrle-duotone"
            ></Icon>
          }
        >
          <div className="h-10 px-5 font-semibold flex-grow flex justify-start items-center">
            <label htmlFor="">Hello Username</label>
          </div>
          <DropdownItem
            className="space-x-2"
            onClick={() => navigate("/dashboard/profile")}
          >
            <Icon
              className="text-2xl text-zinc-400"
              icon="material-symbols:settings"
            ></Icon>
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem
            className="space-x-2"
            onClick={() => navigate("/login")}
          >
            <Icon
              className="text-2xl text-zinc-400"
              icon="material-symbols:logout"
            ></Icon>
            <span>Sign out</span>
          </DropdownItem>
        </Dropdown>
      </div>
    </>
  );
};
