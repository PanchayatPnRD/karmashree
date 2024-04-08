import { useState, useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardHome = () => {
  return (
    <div className="flex-grow">
      <ToastContainer />
      <div className="mx-auto mt-2">
        <div className="bg-white rounded-lg p-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Mini Card 1 */}
            <div className="bg-blue-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Total Scheme</h3>
              <p className="text-xl font-bold">1</p>
            </div>

            {/* Mini Card 2 */}
            <div className="bg-green-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Total Contractor</h3>
              <p className="text-xl font-bold">2</p>
            </div>

            {/* Mini Card 3 */}
            <div className="bg-yellow-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Total Action Plan</h3>
              <p className="text-xl font-bold">3</p>
            </div>

            {/* Mini Card 4 */}
            <div className="bg-pink-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Employment</h3>
              <p className="text-xl font-bold">4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default DashboardHome;
