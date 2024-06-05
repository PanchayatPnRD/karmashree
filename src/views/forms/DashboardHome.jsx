
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Charts from '../../components/Charts';
import { useQuery } from '@tanstack/react-query';
import { fetch} from "../../functions/Fetchfunctions"
import { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { getAllDashboardList } from "../../Service/DashboardService";
const DashboardHome = () => {
  // const countUpRef = useRef(null);
  const [allDashboardList, setAllDashboardList] = useState([]);


const { data:DashboardData, isLoading, isSuccess } = useQuery({

  queryKey:["dashboardData"],
  queryFn: async () => {
    const data = await fetch.get("/api/schememaster/dashboard")
    return data.data.result;
  }
}

)

  useEffect(() => {
    getAllDashboardList().then(function (result) {
      const response = result?.data?.result;
      setAllDashboardList(response);

    });

  }, []);
  console.log(allDashboardList, "allDashboardList")
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
          <div className="grid grid-cols-3 gap-4 ">
            {/* Mini Card 1 */}
            <div className="bg-blue-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">
                Implementing Departments
              </h3>
              <p className="text-xl font-bold">{DashboardData?.DepartmentNoCount}</p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-green-200 rounded-lg p-4 flex flex-col justify-center items-center">
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
            <div className="bg-yellow-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">
                Funding Departments
              </h3>
              <p className="text-xl font-bold">{DashboardData?.FundingDepttIDCount}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            <div className="bg-blue-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Proposed Schemes</h3>
              <p className="text-xl font-bold">-</p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-green-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-md font-semibold mb-2 text-center">
                Estimated Unskilled Workers
              </h3>
              <p className="text-xl font-bold">{DashboardData?.totalUnskilledWorkers}</p>
            </div>

            {/* Mini Card 3 */}
            <div className="bg-yellow-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Estimated Mandays</h3>
              <p className="text-xl font-bold">{DashboardData?.totalPersonDaysGenerated}</p>
            </div>

            {/* Mini Card 4 */}
            <div className="bg-pink-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-md text-center font-semibold mb-2">
                Avg Days of Employment to be provided/Household
              </h3>
              <p className="text-xl font-bold">4</p>
            </div>
          </div>
          <div className="flex-col flex items-center justify-center ">
            <h1 className="text-xl tracking-tight font-bold">
              Last 7 Days Progress
            </h1>
            {isSuccess && <Charts data={DashboardData?.charts} className="shadow-md p-8 px-16 bg-cyan-50 rounded-e-md " />}
          </div>
        </div>
      </div>
    </div>
  );
};



export default DashboardHome;
