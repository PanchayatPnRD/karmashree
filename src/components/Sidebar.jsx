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
import WorkRequirement from "../views/forms/WorkRequirement";
import { Calc_permission } from "../functions/Permissions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { devApi } from "../WebApi/WebApi";

import { SidebarElement, SidebarExpand } from "./SidebarElems";
// import Register from "../views/Register/Register";



export const sideBarList = [
  {
    Component: DashboardHome,
    text: "Home",
    route: "/dashboard",
    permissions: [],
  },
  {
    Component: NewUser,
    text: "department user",
    route: "/dashboard/dept-user",
    permissions: [1, 7, 13, 15, 19, 21, 24, 25, 27],
  },
  {
    Component: UserList,
    text: "department user list",
    route: "/dashboard/dept-userlist",
    permissions: [1, 7, 13, 15, 19, 21, 24, 25, 27],
  },
  {
    Component: Dno,
    text: "dNO user",
    route: "/dashboard/dno-user",
    permissions: [1, 12, 24],
  },
  {
    Component: DnoList,
    text: "dNO user list",
    route: "/dashboard/dno-userlist",
    permissions: [1, 12, 24],
  },
  {
    Component: Designation,
    text: "designation master",
    route: "/dashboard/designation-master",
    permissions: [1],
  },
  {
    Component: Department,
    text: "department master",
    route: "/dashboard/department-master",
    permissions: [1],
  },
  {
    Component: ActionPlan,
    text: "Action Plan",
    route: "/dashboard/action-plan",
    permissions: [1, 7],
  },
  {
    Component: ActionPlanList,
    text: "Action Plan List",
    route: "/dashboard/action-plan-list",
    permissions: [1, 7],
  },
  {
    Component: Scheme,
    text: "scheme",
    route: "/dashboard/scheme",
    permissions: [1,13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: Demand,
    text: "demand",
    route: "/dashboard/demand",
    permissions: [1,13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: WorkRequirement,
    text: "work requirement",
    route: "/dashboard/work-requirement",
    permissions: [1,13, 12, 15, 19, 21, 25, 24, 27],
  },
  {
    Component: WorkAlloc,
    text: "work allocation",
    route: "/dashboard/work-allocation",
    permissions: [1,13, 12, 15, 19, 21, 25, 24, 27],
  },
  {
    Component: Contractor,
    text: "contractor master",
    route: "/dashboard/contractor-master",
    permissions: [1,13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: Employment,
    text: "employment",
    route: "/dashboard/employment",
    permissions: [1,13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
];

export const Sidebar = () => {
  const userMasterHidden = [17,23,29]

  const { userIndex, category } = JSON.parse(
    localStorage.getItem("karmashree_User")
  );

  const { data: userDetails, isSuccess } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await axios.get(devApi + "/api/user/viewuser/" + userIndex);

      return data.data.result;
    },
  });

  const userRoleIndex = Calc_permission(
    userDetails?.category,
    userDetails?.role_type,
    Boolean(parseInt(userDetails?.dno_status))
  )?.uniqueId;


  return (
    <div className=" flex flex-col p-3">
      <SidebarElement to="/dashboard" customCss={"flex justify-center "}>
        <div className=" items-center py-2 capitalize">Home</div>
      </SidebarElement>
      <div className="h-2"></div>
      {isSuccess && !userMasterHidden.includes(userRoleIndex) && <SidebarExpand text={"User Master"}>
        {sideBarList
          .slice(1, 5)
          .filter((e) => e.permissions.includes(userRoleIndex))
          .map((e) => {
            return (
              <SidebarElement
                key={e.route}
                to={e.route}
                customCss={"py-2 pl-8 text-sm"}
              >
                <div className=" items-center capitalize">{e.text}</div>
              </SidebarElement>
            );
          })}
      </SidebarExpand>}

      {isSuccess && sideBarList
        .slice(5, sideBarList.length)
        .filter((e) => e.permissions.includes(userRoleIndex))
        .map((e) => {
          return (
            <SidebarElement
              key={e.route}
              to={e.route}
              customCss={"py-2.5 pl-16"}
            >
              <div className=" items-center capitalize">{e.text}</div>
            </SidebarElement>
          );
        })}
    </div>
  );
};
