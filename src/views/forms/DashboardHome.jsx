
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Charts from '../../components/Charts';
import { useState, useRef } from 'react';
import CountUp from "react-countup";

const DashboardHome = () => {
  // const countUpRef = useRef(null);
  
  
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
              <p className="text-xl font-bold">1</p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-green-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">No of PIA</h3>
              <p className="text-xl font-semibold">
                <CountUp
                  start={-875.039}
                  end={160527}
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
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            <div className="bg-blue-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Proposed Schemes</h3>
              <p className="text-xl font-bold">1</p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-green-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-md font-semibold mb-2 text-center">
                Estimated Unskilled Workers
              </h3>
              <p className="text-xl font-bold">2</p>
            </div>

            {/* Mini Card 3 */}
            <div className="bg-yellow-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Estimated Mandays</h3>
              <p className="text-xl font-bold">3</p>
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
            <Charts className="shadow-md p-8 px-16 bg-cyan-50 rounded-e-md " />
          </div>
        </div>
      </div>
    </div>
  );
};



export default DashboardHome;
