import { lazy } from "react";
const ActionPlan = lazy(() => import("../views/forms/ActionPlan"));
// import ActionPlan from "../views/forms/ActionPlan";
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

import ActionPlanReport from "../views/reports/ActionPlanReport";
import SchemeReport from "../views/reports/SchemeReport"
import DemandReport from "../views/reports/DemandReport";
import AllocationReport from "../views/reports/AllocationReport"
import EmploymentReport from "../views/reports/EmploymentReport"
import DirectEmployment from "../views/forms/DirectEmployment";

import { Pedestal } from "../views/forms/Pedestal";
import { Calc_permission } from "../functions/Permissions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetch } from "../functions/Fetchfunctions";
import { devApi } from "../WebApi/WebApi";

import { SidebarElement, SidebarExpand } from "./SidebarElems";
import ContractorList from "../views/forms/ContractorList";
import SchemeList from "../views/forms/SchemeList";
// import Register from "../views/Register/Register";
import WorkRequirementList from "../views/forms/WorkRequirementList";
import EmploymentList from "../views/forms/EmploymentList";
import DemandList from "../views/forms/DemandList";
import WorkAllocationList from "../views/forms/WorkAllocationList";

import { Icon } from "@iconify/react/dist/iconify.js";

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
    permissions: [1, 7, 13, 15, 19, 21, 25, 27],
  },
  {
    Component: UserList,
    text: "department user list",
    route: "/dashboard/dept-userlist",
    permissions: [1, 7, 13, 15, 19, 21, 25, 27],
  },
  {
    Component: Dno,
    text: "DNO-MGNREGS User",
    route: "/dashboard/dno-user",
    permissions: [1, 12, 24],
  },
  {
    Component: DnoList,
    text: "DNO-MGNREGS User list",
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
    Component: Pedestal,
    text: "Parastatals master",
    route: "/dashboard/pedestal-master",
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
    Component: Contractor,
    text: "contractor master",
    route: "/dashboard/contractor-master",
    permissions: [1, 7, 13, 12, 15, 17, 19, 21, 23, 25, 24, 29],
  },
  {
    Component: ContractorList,
    text: "contractor list",
    route: "/dashboard/contractor-list",
    permissions: [1, 7, 13, 12, 15, 17, 19, 21, 23, 25, 24, 29],
  },
  {
    Component: Scheme,
    text: "scheme",
    route: "/dashboard/scheme",
    permissions: [1, 7, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: SchemeList,
    text: "scheme List",
    route: "/dashboard/scheme-list",
    permissions: [1, 7, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: Demand,
    text: "demand",
    route: "/dashboard/demand",
    permissions: [
      1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29, 30, 31, 32, 33, 34, 35,
    ],
  },
  {
    Component: DemandList,
    text: "demand list",
    route: "/dashboard/demand-list",
    permissions: [
      1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29, 30, 31, 32, 33, 34, 35,
    ],
  },
  {
    Component: WorkRequirement,
    text: "Worker Requisition",
    route: "/dashboard/work-requirement",
    permissions: [1, 13, 12, 15, 19, 21, 25, 24, 27],
  },
  {
    Component: WorkRequirementList,
    text: "Worker Requisition List",
    route: "/dashboard/work-requirement-list",
    permissions: [1, 13, 12, 15, 19, 21, 25, 24, 27],
  },

  {
    Component: WorkAlloc,
    text: "worker allocation",
    route: "/dashboard/work-allocation",
    permissions: [1, 13, 12, 15, 19, 21, 25, 24, 27],
  },

  {
    Component: WorkAllocationList,
    text: "worker allocation list",
    route: "/dashboard/work-allocation-list",
    permissions: [1, 13, 12, 15, 19, 21, 25, 24, 27],
  },

  {
    Component: Employment,
    text: "employment",
    route: "/dashboard/employment",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },

  {
    Component: DirectEmployment,
    text: "direct employment",
    route: "/dashboard/direct-employment",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: EmploymentList,
    text: "employment list",
    route: "/dashboard/employment-list",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: ActionPlanReport,
    text: "action plan Report",
    route: "/dashboard/actionplan-report",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  // {
  //   Component: ActionPlanReport1,
  //   text: "action plan Report 1",
  //   route: "/dashboard/actionplan-report1",
  //   permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  // },
  // {
  //   Component: ActionPlanReport2,
  //   text: "action plan Report 2",
  //   route: "/dashboard/actionplan-report2",
  //   permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  // },
  // {
  //   Component: ActionPlanReport3,
  //   text: "action plan Report 3",
  //   route: "/dashboard/actionplan-report3",
  //   permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  // },
  {
    Component: SchemeReport,
    text: "scheme Report",
    route: "/dashboard/scheme-report",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: DemandReport,
    text: "demand Report",
    route: "/dashboard/demand-report",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
  {
    Component: AllocationReport,
    text: "allocation & requisition Report",
    route: "/dashboard/alloc-report",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },

  {
    Component: EmploymentReport,
    text: "employment Report",
    route: "/dashboard/employment-report",
    permissions: [1, 13, 12, 15, 17, 19, 21, 23, 25, 24, 27, 29],
  },
];

export const Sidebar = () => {
  const userMasterHidden = [17, 23, 29, 30, 31, 32, 33, 34, 35];
  const MasterHidden = [
    7, 12, 13, 15, 17, 19, 21, 23, 24, 25, 27, 29, 30, 31, 32, 33, 34, 35,
  ];
  const actionPlanHidden = [
    12, 13, 15, 17, 19, 21, 23, 24, 25,27, 29, 30, 31, 32, 33, 34, 35,
  ];
  const contractorHidden = [7,27, 30, 31, 32, 33, 34, 35];
  const schemeHidden = [ 7, 30, 31, 32, 33, 34, 35];
  const demandHidden = [1, 7];
  const requirementHidden = [1, 7, 17, 23, 29, 30, 31, 32, 33, 34, 35];
  const allocationHidden = [1, 7, 17, 23, 29, 30, 31, 32, 33, 34, 35];
  const employmentHidden = [1, 7, 30, 31, 32, 33, 34, 35];
  const reportHidden = [1, 7,27, 30, 31, 32, 33, 34, 35];
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));

  const { data: userDetails, isSuccess } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/" + userIndex);

      return data.data.result;
    },
  });

  const userRoleIndex = Calc_permission(
    userDetails?.category,
    userDetails?.role_type,
    Boolean(parseInt(userDetails?.dno_status))
  )?.uniqueId;
  // console.log(userRoleIndex, "permission");

  return (
    <div className="z-20 flex flex-col p-3">
      <SidebarElement to="/dashboard" customCss={"flex justify-start pl-10 "}>
        <div className=" items-start py-2 capitalize">
          <span className="flex items-center space-x-4">
            <Icon icon={"material-symbols:home"} className="text-2xl" />
            <span>Home</span>
          </span>
        </div>
      </SidebarElement>
      <div className="h-2"></div>
      {isSuccess && !userMasterHidden.includes(userRoleIndex) && (
        <SidebarExpand text={"User Creation"} icon={"mdi:user"}>
          {sideBarList
            .slice(1, 5)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}

      {isSuccess && !MasterHidden.includes(userRoleIndex) && (
        <SidebarExpand text={"Master Entry"} icon={"hugeicons:microsoft-admin"}>
          {sideBarList
            .slice(5, 8)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {isSuccess && !actionPlanHidden.includes(userRoleIndex) && (
        <SidebarExpand
          text={"Action Plan Master"}
          icon={"icon-park-solid:plan"}
        >
          {sideBarList
            .slice(8, 10)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {isSuccess && !contractorHidden.includes(userRoleIndex) && (
        <SidebarExpand
          text={"Contractor Master"}
          icon={"map:general-contractor"}
        >
          {sideBarList
            .slice(10, 12)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {isSuccess && !schemeHidden.includes(userRoleIndex) && (
        <SidebarExpand text={"Scheme Master"} icon={"eos-icons:project"}>
          {sideBarList
            .slice(12, 14)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {isSuccess && !demandHidden.includes(userRoleIndex) && (
        <SidebarExpand text={"Demand Register"} icon={"mdi:register"}>
          {sideBarList
            .slice(14, 16)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {isSuccess && !requirementHidden.includes(userRoleIndex) && (
        <SidebarExpand text={"Worker Requisition"} icon={"mdi:worker"}>
          {sideBarList
            .slice(16, 18)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {isSuccess && !allocationHidden.includes(userRoleIndex) && (
        <SidebarExpand
          text={"Worker Allocation"}
          icon={"clarity:assign-user-solid"}
        >
          {sideBarList
            .slice(18, 20)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {isSuccess && !employmentHidden.includes(userRoleIndex) && (
        <SidebarExpand
          text={"Worker Employment"}
          icon={"clarity:employee-solid"}
        >
          {sideBarList
            .slice(20, 23)
            .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {/* <SidebarExpand text={"Direct Employment"}>
        {sideBarList
          .slice(22, 23)
          .filter((e) => e.permissions.includes(userRoleIndex))
          .map((e) => {
            return (
              <SidebarElement
                key={e.route}
                to={e.route}
                customCss={"py-2 pl-8 text-sm"}
                isWrapped
              >
                <div className=" items-center capitalize">{e.text}</div>
              </SidebarElement>
            );
          })}
      </SidebarExpand> */}
      {isSuccess && !reportHidden.includes(userRoleIndex) && (
        <SidebarExpand text={"Reports"} icon={"bxs:report"}>
          {sideBarList
            .slice(23, sideBarList.length)
            // .filter((e) => e.permissions.includes(userRoleIndex))
            .map((e) => {
              return (
                <SidebarElement
                  key={e.route}
                  to={e.route}
                  customCss={"py-2 pl-8 text-sm"}
                  isWrapped
                >
                  <div className=" items-center capitalize">{e.text}</div>
                </SidebarElement>
              );
            })}
        </SidebarExpand>
      )}
      {/* {isSuccess &&
        sideBarList
          .slice(18, sideBarList.length)
          .filter((e) => e.permissions.includes(userRoleIndex))
          .map((e) => {
            return (
              <SidebarElement
                key={e.route}
                to={e.route}
                customCss={"py-2.5 pl-10"}
              >
                <div className=" items-center capitalize">{e.text}</div>
              </SidebarElement>
            );
          })} */}
    </div>
  );
};
