import { Children } from "react";
import { SidebarElement, SidebarExpand } from "./SidebarElems";
import Register from "../views/Register/Register";
export const sideBarList = [
  { text:"Register",Text: Register, route: "/dashboard/register" },
  { text: "user list", route: "/dashboard/user-list" },
  { text: "Action Plan", route: "/dashboard/action-plan" },
  { text: "scheme", route: "/dashboard/scheme" },
  { text: "demand", route: "/dashboard/demand" },
  { text: "work allocation", route: "/dashboard/work-allocation" },
  { text: "contractor master", route: "/dashboard/contractor-master" },
  { text: "employment", route: "/dashboard/employment" },
];

export const Sidebar = () => {
  return (
    <div className="h-full bg-blue-950 flex flex-col space-y-6 py-8">
      {/* <SidebarElement to="/dashboard">
        <div className="text-white text-center capitalize">Home</div>
      </SidebarElement> */}
      {sideBarList.map((e) => {
        return (
          <SidebarElement to={e.route}>
            <div className="text-white text-center items-center capitalize">{e.text}</div>
          </SidebarElement>
        );
      })}
    </div>
  );
};
