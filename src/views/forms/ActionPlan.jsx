import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const ActionPlan = () => {
  return (
    <div className="flex-grow">
      <ToastContainer />
      <div className="mx-auto mt-2">
        <div className="bg-white rounded-lg p-12">
          <div className="shadow-md" style={{ marginBottom: "-1rem" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <nav aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-4 px-4 py-2">
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
                    </svg>
                    <li>
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Home
                      </a>
                      /
                    </li>
                    <li className="text-gray-500 font-bold" aria-current="page">
                      Action Plan
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <br />
          </div>

          <br></br>
          <div className="bg-white shadow-md rounded-lg p-12">

            
            <div className="flex w-full space-x-4 mb-6">
              
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Scheme Area
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Area</option>
                  <option value="Rural">Rural</option>
                  <option value="Urban">Urban</option>
                  
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="px-12">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  District
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select District</option>
                  <option value="Rural">Rural</option>
                  <option value="Urban">Urban 2</option>
                  
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Municipality/Block
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Municipality/Block</option>
                  <option value="Rural">Rural</option>
                  <option value="Urban">Urban 2</option>
                  
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gram Panchayat
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select District</option>
                  <option value="Rural">Rural</option>
                  <option value="Urban">Urban 2</option>
                  
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type of Sector 
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Sector</option>
                  <option value="scheme1">PWD</option>
                  <option value="scheme2">PNRD</option>

                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Schemes Proposed
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Scheme Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex w-full space-x-4 mb-6">
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tentative Total Cost of Schemes
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Sector Name</option>
                  <option value="scheme1">PWD</option>
                  <option value="scheme2">PNRD</option>

                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tentative Total Wage to be paid in the Schemes
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Scheme Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Persondays to be Generated
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Scheme Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total no. of Job Card Holders to be engaged
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Scheme Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex w-full space-x-4 mb-4">
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Average Days of Employment to be provided per family
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Scheme Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              
              
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
