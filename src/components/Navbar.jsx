import { Karmashree_logo } from "./Logo";
import emblem from "/assets/logo/biswa.png";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="p-4 px-16 flex justify-between border items-center sticky top-0 left-0 z-50 bg-white shadow-lg">
        <Link
          to={"/"}
          state={pathname}
          className="flex items-center space-x-2 w-fit"
        >
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
        <div className="h-12 flexitems-center space-x-4">
          <Link to={"/"} state={pathname}>
            <button className="px-4 p-2 border border-zinc-200 rounded-full hover:bg-sky-950 hover:text-white transition-all duration-300">
              Home
            </button>
          </Link>
          <Link to={"/login"} state={pathname}>
            <button className="px-4 p-2 border border-zinc-200 rounded-full hover:bg-sky-950 hover:text-white transition-all duration-300">
              Login
            </button>
          </Link>
          <Link to={"/contact"} state={pathname}>
            <button className="px-4 p-2 border border-zinc-200 rounded-full hover:bg-sky-950 hover:text-white transition-all duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
