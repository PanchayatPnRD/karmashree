import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Charts = lazy(() => import("../../components/Charts"));
// import Charts from "../../components/Charts";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import { lazy, useEffect, useMemo, useState, Suspense } from "react";
import CountUp from "react-countup";
import { getAllDashboardList } from "../../Service/DashboardService";
const DashboardHome = () => {
  // const countUpRef = useRef(null);
  const [allDashboardList, setAllDashboardList] = useState([]);

  const {
    data: DashboardData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const data = await fetch.get("/api/schememaster/dashboard");
      return data.data.result;
    },
  });

  useEffect(() => {
    getAllDashboardList().then(function (result) {
      const response = result?.data?.result;
      setAllDashboardList(response);
    });
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
            <div className="bg-blue-300 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-lg font-semibold mb-2">
                Implementing Departments
              </h3>
              <p className="text-xl font-bold">
                {DashboardData?.DepartmentNoCount}
              </p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-green-300 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
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
            <div className="bg-yellow-200 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
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
            <div className="bg-pink-300 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-md text-center font-semibold mb-2">
                Total Amount Wages paid
              </h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={DashboardData?.totalwage}
                  duration={2.75}
                  // delay={0}
                />
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            <div className="bg-blue-300 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
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
            <div className="bg-green-300 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
              <h3 className="text-md font-semibold mb-2 text-center">
                Estimated Unskilled Workers
              </h3>
              <p className="text-xl font-bold">
                <CountUp
                  start={0}
                  end={DashboardData?.totalUnskilledWorkers}
                  duration={2.75}
                  // delay={0}
                />
              </p>
            </div>

            {/* Mini Card 3 */}
            <div className="bg-yellow-200 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
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
            <div className="bg-pink-300 rounded-lg p-4 flex flex-col justify-center items-center shadow hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:-translate-x-1">
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
                    className="shadow-md pb-8 px-16 bg-cyan-100"
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
