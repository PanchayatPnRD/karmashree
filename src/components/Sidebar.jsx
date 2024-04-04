import { Children } from "react";
import { SidebarElement, SidebarExpand } from "./SidebarElems";
import Register from "../views/Register/Register";
export const sideBarList = [
  { text: "new user", route: "/dashboard/register" },
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
    <div className="h-full bg-blue-950 flex flex-col flex-grow pt-3">
      <SidebarElement to="/dashboard" className={"py-2.5 pl-16"}>
        <div className=" items-center capitalize">Dashboard</div>
      </SidebarElement>

      <SidebarExpand text={"User Master"}>
        {sideBarList.slice(0, 2).map((e) => {
          return (
            <SidebarElement to={e.route} className={"py-2 pl-8"}>
              <div className=" items-center capitalize">{e.text}</div>
            </SidebarElement>
          );
        })}
      </SidebarExpand>

      {sideBarList.slice(2, sideBarList.length).map((e) => {
        return (
          <SidebarElement to={e.route}>
            <div className=" items-center capitalize">{e.text}</div>
          </SidebarElement>
        );
      })}
    </div>
  );
};
