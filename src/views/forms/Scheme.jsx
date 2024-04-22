import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
const Scheme = () => {
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
                    {" "}
                    {/* Added padding */}{" "}
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
                      Scheme
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
                  Area Type *
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Scheme Name</option>
                  <option value="R">Rural</option>
                  <option value="U">Urban</option>
                  
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  District *
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select District List</option>
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
                  Municipality
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Municipality List</option>
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
                  Block 
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Municipality List</option>
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
                  GP 
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Municipality List</option>
                  <option value="scheme1">PWD</option>
                  <option value="scheme2">PNRD</option>

                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col w-full mb-4">
            <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Scheme Sector * Drop Down List
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
                  Scheme Name * Only Alphabel and White Space allow
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Scheme Name... * Only Alphabel and White Space allow"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required
                />
              </div>
              
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Worksite Location (Full Address) *
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Worksite Location (Full Address) ..."
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Funding Department *  Drop Down List
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
              
            </div>
            <div className="flex w-full space-x-4 mb-6">
              
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status of Work *
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Status of Work</option>
                  <option value="P">Proposed</option>
                  <option value="S">Started</option>
                  <option value="O">Ongoing</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tentative Work Start Date * (if = Proposed Then)
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select District List</option>
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
                  Actual Work Start Date (if = Proposed Then)
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Municipality List</option>
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
                  Expected Work Completion Date  (if = Proposed Then)
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Municipality List</option>
                  <option value="scheme1">PWD</option>
                  <option value="scheme2">PNRD</option>

                  {/* Add more options as needed */}
                </select>
              </div>
              
            </div>
            <div className="flex w-full mb-4">
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Cost (in Rs.) * Validation  Numuric with 2 decemel
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
                  Total Wage Cost involved in the Work  * Validation  Numuric with 2 decemel
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
                  Persondays to be generated from the Work  * Validation  Numuric
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
            <div className="flex w-full space-x-4 mb-4 ">
            <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Unskilled Workers to be  engaged  * Validation Numuric
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
                  No of Semi-Skilled Workers to be  engaged  * Validation  Numuric 
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder=" /[0-9]$/; "
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Skilled Workers to be  engaged  * Validation  Numuric 
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder=" /[0-9]$/; "
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              
            </div>
            <div className="flex w-full space-x-4 mb-4 ">
            <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Work Order Number 
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Work Order Number...."
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Work Order Date  Calander Date
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Date.... "
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contractor List From Contractor Master
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder=" /[7]{1}[0-9]{5}$/; "
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              
            </div>
            <div className="flex flex-col w-full mb-4">
            <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Remarks Validation Alph anumuric special (,/)
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder=" Remarks........"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                //onClick={onRegister}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheme;
