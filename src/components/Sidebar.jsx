import ActionPlan from "../views/forms/ActionPlan";
import ActionPlanList from "../views/forms/ActionPlanList";
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
import DnoList from "../views/forms/DnoList";
import Dno from "../views/forms/Dno";
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
    text: "department user",
    route: "/dashboard/dept-user",
  },
  {
    Component: UserList,
    text: "department user list",
    route: "/dashboard/dept-userlist",
  },
  {
    Component: Dno,
    text: "dNO user",
    route: "/dashboard/dno-user",
  },
  {
    Component: DnoList,
    text: "dNO user list",
    route: "/dashboard/dno-userlist",
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
    Component: ActionPlanList,
    text: "Action Plan List",
    route: "/dashboard/action-plan-list",
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
  

  return (
    <div className=" flex flex-col p-3">
      <SidebarElement
        to="/dashboard"
        customCss={"flex justify-center "}
      >
        <div className=" items-center py-2 capitalize">Home</div>
      </SidebarElement>
      <div className="h-2"></div>
      <SidebarExpand text={"User Master"}>
        {sideBarList.slice(1, 5).map((e) => {
          return (
            <SidebarElement key={e.route} to={e.route} customCss={"py-2 pl-8 text-sm"}>
              <div className=" items-center capitalize">{e.text}</div>
            </SidebarElement>
          );
        })}
      </SidebarExpand>

      {sideBarList.slice(5, sideBarList.length).map((e) => {
        return (
          <SidebarElement key={e.route} to={e.route} customCss={"py-2.5 pl-16"}>
            <div className=" items-center capitalize">{e.text}</div>
          </SidebarElement>
        );
      })}
    </div>
  );
};
