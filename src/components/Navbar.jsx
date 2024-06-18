import { Karmashree_logo } from "./Logo";
import { useState, useEffect, useMemo } from "react";
import emblem from "/assets/logo/biswa.png";
import { Link, useLocation } from "react-router-dom";
import { devApi } from "../WebApi/WebApi";
import classNames from "classnames";
import { useNetworkState } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { online } = useNetworkState();
  const [serverStat, setserverStat] = useState();

  const { data, isError, isFetched, isFetching } = useQuery({
    queryKey: ["serverStatus"],
    queryFn: async () => {
      const response = await axios.get(devApi);
      return response;
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
  useEffect(() => {
    localStorage.setItem("karmashree_AuthToken", "");
  }, []);

  useEffect(() => {
    if (isFetched && !isFetching) setserverStat(isError);
  }, [isFetching]);

  return (
    <>
      <div className=" flex flex-col items-center sticky top-0 left-0 z-50 bg-white shadow-lg">
        <div className=" p-4 px-16 flex justify-between w-full items-center">
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
                department of panchayats & rural development
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
        <div
          className={classNames(
            online ? (!serverStat ? "h-0" : "h-8") : "h-8",
            " bg-red-600 flex justify-center items-center text-white font-semibold transition-all duration-300 w-full"
          )}
        >
          {online
            ? serverStat == true && "Unable to connect to the server"
            : "You are Offline"}
        </div>
      </div>
    </>
  );
};
