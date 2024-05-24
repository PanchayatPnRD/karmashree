import { DashboardNavbar } from "../components/DashboardNavbar";
import { Sidebar } from "../components/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import classNames from "classnames";
// import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { Footer } from "../components/Footer";

const Dashboard = ({ children }) => {
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
            "hide inset-y-0 top-[98px] min-h-remaining bg-blue-950 fixed overflow-y-auto transition-all duration-300"
          )}
        >
          {actualVis && <Sidebar />}
        </div>

        <div
          className={classNames(
            isSidebarOpen
              ? "w-[75vw] xl:w-[80vw] ml-[25vw] xl:ml-[20vw]"
              : "w-screen ml-0",
            " min-h-remaining mt-[98px]  flex flex-col shadow-xl bg-white transition-all duration-300"
          )}
        >
          <div className="flex">
            <button
              className="fixed"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              {isSidebarOpen ? (
                <Icon
                  className="text-4xl text-blue-600 rotate-180"
                  icon={"lucide:sidebar-open"}
                />
              ) : (
                <Icon
                  className="text-4xl text-blue-600 rotate-180"
                  icon={"lucide:sidebar-close"}
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
