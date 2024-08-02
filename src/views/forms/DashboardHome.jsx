import { lazy, useEffect, useMemo, useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Charts = lazy(() => import("../../components/Charts"));
// import Charts from "../../components/Charts";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import CountUp from "react-countup";
import { getAllDashboardList } from "../../Service/DashboardService";
const DashboardHome = () => {
  // const countUpRef = useRef(null);
  const [allDashboardList, setAllDashboardList] = useState([]);

  const { userIndex, category } = JSON.parse(
    sessionStorage.getItem("karmashree_User")
  );

  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser");
      return data.data.result;
    },
  });

  const {
    data: DashboardData,
    isSuccess,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/schememaster/dashboard?category=${userDetails?.category}&dno_status=${userDetails?.dno_status}&departmentNo=${userDetails?.departmentNo}&districtCode=${userDetails?.districtcode}&blockcode=${userDetails?.blockcode}&gpCode=${userDetails?.gpCode}`
      );
      return data.data.result;
    },
    enabled: userDetails?.category != undefined
  });

  useEffect(() => {
    getAllDashboardList().then(function (result) {
      const response = result?.data?.result;
      setAllDashboardList(response);
    });
    sessionStorage.setItem("resendToken","");
  }, []);
  console.log(allDashboardList, "allDashboardList");
  //Dashboard list
  // let dashboardListDropdown = <option>Loading...</option>;
  // if (allDashboardList && allDashboardList.length > 0) {
  //   dashboardListDropdown = allDashboardList?.charts[0]?.map((DashRow, index) => (
  //     <option>{DashRow.month}</option>
  //   ));
  // }
  // console.log(dashboardListDropdown,"dashboardListDropdown")

  return (
    <div className="flex-grow">
      {/* <ToastContainer /> */}
      <div className="mx-auto mt-2">
        <div className="flex flex-col space-y-4 bg-white rounded-lg p-12">
          <div className="grid grid-cols-4 gap-4 ">
            {/* Mini Card 1 */}
            <div className="bg-gradient-to-br from-orange-500 to-purple-800 text-white rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-lg font-semibold mb-2">
                Implementing Departments
              </h3>
              <p className="text-xl font-bold">
                {DashboardData?.DepartmentNoCount}
              </p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-gradient-to-br from-slate-500 to-slate-900 text-white rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-lg font-semibold mb-2">No of PIA</h3>
              <p className="text-xl font-semibold">
                <CountUp
                  start={0}
                  end={DashboardData?.ExecutingDepttIDCount}
                  duration={2.75}
                  // delay={0}
                />
              </p>
            </div>

            {/* Mini Card 3 */}
            <div className="bg-gradient-to-br text-white from-pink-600 to-indigo-600 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-lg font-semibold mb-2">
                Funding Departments
              </h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={DashboardData?.FundingDepttIDCount}
                  duration={2.75}
                  // delay={0}
                />
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-300 to-orange-500 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-md text-center font-semibold mb-2">
                Total Amount Wages paid
              </h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={DashboardData?.totalwage}
                  duration={2.75}
                  decimals={2}
                  prefix="₹"
                  // delay={0}
                />
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            <div className="bg-gradient-to-br from-blue-400 to-rose-400 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-lg font-semibold mb-2">Proposed Schemes</h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={DashboardData?.totalscheme}
                  duration={2.75}
                  // delay={0}
                />
              </p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-gradient-to-br text-white from-lime-400 to-sky-700 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-md font-semibold mb-2 text-center">
                Estimated Unskilled Workers
              </h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={DashboardData?.totalUnskilledWorkers}
                  duration={2.75}
                  // decimals={2}
                  // delay={0}
                />
              </p>
            </div>

            {/* Mini Card 3 */}
            <div className="bg-gradient-to-br from-fuchsia-200 to-blue-400 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-lg font-semibold mb-2">Estimated Mandays</h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={DashboardData?.totalPersonDaysGenerated}
                  duration={2.75}
                  // delay={0}
                />
              </p>
            </div>

            {/* Mini Card 4 */}
            <div className="bg-gradient-to-tl text-white from-yellow-300 from-10% via-green-500 to-cyan-400 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-md text-center font-semibold mb-2">
                Avg Days of Employment to be provided/Household
              </h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={Math.round(DashboardData?.avgCostProvidedPerWorker)}
                  duration={2.75}
                  // delay={0}
                />
              </p>
            </div>
          </div>
          <div>
            <div></div>
            <div className="flex-col flex items-center justify-center">
              {isSuccess && (
                <Suspense>
                  <Charts
                    data={DashboardData?.charts}
                    className=" rounded-md shadow-md pb-8 px-16 bg-gradient-to-b from-blue-100 from-0% via-cyan-100 via-50% to-indigo-200 to-95%"
                  />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
