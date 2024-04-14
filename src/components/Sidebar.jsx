import ActionPlan from "../views/forms/ActionPlan";
import Contractor from "../views/forms/Contractor";
import Demand from "../views/forms/Demand";
import Employment from "../views/forms/Employment";
import NewUser from "../views/forms/NewUser";
import Department from "../views/forms/Department";
import Designation from "../views/forms/Designation";
import Scheme from "../views/forms/Scheme";
import UserList from "../views/forms/UserList";
import WorkAlloc from "../views/forms/WorkAlloc";
import DashboardHome from "../views/forms/DashboardHome";
import { useResolvedPath, useMatch } from "react-router-dom";
import classNames from 'classnames';

import { SidebarElement, SidebarExpand } from "./SidebarElems";
// import Register from "../views/Register/Register";
export const sideBarList = [
  {
    Component: DashboardHome,
    text: "Home",
    route: "/dashboard",
  },
  {
    Component: NewUser,
    text: "new user",
    route: "/dashboard/new-user",
  },
  {
    Component: UserList,
    text: "user list",
    route: "/dashboard/user-list",
  },
  {
    Component: Designation,
    text: "designation master",
    route: "/dashboard/designation-master",
  },
  {
    Component: Department,
    text: "department master",
    route: "/dashboard/department-master",
  },
  {
    Component: ActionPlan,
    text: "Action Plan",
    route: "/dashboard/action-plan",
  },
  {
    Component: Scheme,
    text: "scheme",
    route: "/dashboard/scheme",
  },
  {
    Component: Demand,
    text: "demand",
    route: "/dashboard/demand",
  },
  {
    Component: WorkAlloc,
    text: "work allocation",
    route: "/dashboard/work-allocation",
  },
  {
    Component: Contractor,
    text: "contractor master",
    route: "/dashboard/contractor-master",
  },
  {
    Component: Employment,
    text: "employment",
    route: "/dashboard/employment",
  },
];

export const Sidebar = () => {
  let resolved = useResolvedPath("/dashboard");
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className=" flex flex-col p-3">
      <SidebarElement
        to="/dashboard"
        className={"flex justify-center bg-blue-600/20 hover:bg-blue-600"}
      >
        <div className=" items-center py-2 capitalize">Home</div>
      </SidebarElement>

      <SidebarExpand text={"User Master"}>
        {sideBarList.slice(1, 3).map((e) => {
          return (
            <SidebarElement key={e.route} to={e.route} customCss={"py-2 pl-16 text-red-500"}>
              <div className=" items-center capitalize">{e.text}</div>
            </SidebarElement>
          );
        })}
      </SidebarExpand>

      {sideBarList.slice(3, sideBarList.length).map((e) => {
        return (
          <SidebarElement key={e.route} to={e.route} customCss={"py-2.5 pl-16"}>
            <div className=" items-center capitalize">{e.text}</div>
          </SidebarElement>
        );
      })}
    </div>
  );
};
