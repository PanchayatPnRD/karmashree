import { Karmashree_logo } from "./Logo";
import emblem from "/assets/logo/biswa.png";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "./Dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const DashboardNavbar = () => {
  

  const { userIndex, category } = JSON.parse(
    localStorage.getItem("karmashree_User")
  );
  

  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await axios.get(
        "http://43.239.110.159:8094/api/user/viewuser/"+userIndex
      );

      return data.data.result;
    },
  });

  const navigate = useNavigate();

  console.log(userDetails,"userDetails")
  return (
    <>
      <div className="p-4 px-16 flex justify-between border items-center sticky top-0 left-0 z-50 bg-white shadow-lg">
        <Link to={"/dashboard"} className="flex items-center space-x-2 w-fit">
          <div className="flex">
            <Karmashree_logo className="fill-blue-600 h-14 w-fit" />
            <img src={emblem} alt="" className="h-16" />
          </div>
          <div className="flex flex-col -space-y-1">
            <h1 className="capitalize font-semibold text-2xl tracking-tight">
              department of panchayat & rural development
            </h1>
            <h3 className="capitalize text-zinc-500">
              government of west bengal
            </h3>
          </div>
        </Link>

        <Dropdown
          Button={
            <div className="flex justify-center items-center">
              <div className="flex flex-col px-2">
                <span className="text-lg font-bold text-black">
                  {userDetails?.userId}
                </span>
                <span className="text-sm text-end">{category}#{userIndex}</span>
              </div>

              <Icon
                className="text-5xl"
                icon="lets-icons:user-cicrle-duotone"
              />
            </div>
          }
        >
          <div className="h-10 px-5 font-semibold flex-grow flex justify-start items-center">
            <label htmlFor="">Hello {userDetails?.userId}</label>
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
            onClick={() => {
              navigate("/login", { state: "signout" });
              localStorage.removeItem("karmashree_User");
            }}
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
