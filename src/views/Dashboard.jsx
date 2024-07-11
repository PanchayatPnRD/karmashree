import { DashboardNavbar } from "../components/DashboardNavbar";
import { Sidebar } from "../components/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import classNames from "classnames";
import { useNetworkState } from "@uidotdev/usehooks";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { Footer } from "../components/Footer";

const Dashboard = ({ children }) => {
  const { online } = useNetworkState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const visibility = useDebounce(isSidebarOpen, 250);

  const actualVis = useMemo(() => {
    if (isSidebarOpen && visibility) return true;
    if (!isSidebarOpen && visibility) return false;
  }, [isSidebarOpen, visibility]);

  return (
    <div className="overflow-x-hidden">
      <DashboardNavbar />

      <div className="flex" id="main-content">
        <div
          className={classNames(
            isSidebarOpen ? "w-1/4 xl:w-1/5" : "w-[1px]",
            "hide inset-y-0  bg-gradient-to-b from-blue-950 to-zinc-900 fixed overflow-y-auto transition-all duration-300",
            online ? "top-[96px] min-h-remaining" : "top-[128px] min-h-offline"
          )}
        >
          {actualVis && <Sidebar />}
        </div>

        <div
          className={classNames(
            isSidebarOpen
              ? "w-[75vw] xl:w-[80vw] ml-[25vw] xl:ml-[20vw]"
              : "w-screen ml-0",
            " flex flex-col shadow-xl bg-white transition-all duration-300",
            online ? "mt-[96px] min-h-remaining" : "mt-[128px] min-h-offline"
          )}
        >
          <div className="flex">
            <button
              className="fixed"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              {isSidebarOpen ? (
                <Icon
                  className="text-2xl text-zinc-400 rotate-180"
                  icon={"icon-park-outline:close"}
                />
              ) : (
                <Icon
                  className="text-3xl text-blue-600 rotate-180"
                  icon={"icon-park-outline:hamburger-button"}
                />
              )}
            </button>
          </div>
          {children}

          <Footer className="justify-items-end" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
