import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { devApi } from "../../WebApi/WebApi";
import {
  getAllDistrictActionList, getAllBlockList, getAllMunicipalityList,
  getAllGramPanchayatList, getAllSectorActionList, addCreateAction
} from "../../Service/ActionPlan/ActionPlanService";
const Contractor = () => {
  const [area, setArea] = useState();
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [allBlockList, setAllBlockList] = useState([]);
  const [block, setBlock] = useState("");
  const [district, setDistrict] = useState("");
  const [allGpList, setAllGpList] = useState([]);


  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    // setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });

  }, []);

  //District list

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }


  const onArea = (e) => {
    setArea(e.target.value)
  }


  const onDistrict = (e) => {
    setDistrict(e.target.value)
    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });

    getAllMunicipalityList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllMunicipalityList(response);
    });
  }

  let blockListDropdown = <option>Loading...</option>;
  if (allBlockList && allBlockList.length > 0) {
    blockListDropdown = allBlockList.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.blockName}</option>
    ));
  }

  let municipalityListDropdown = <option>Loading...</option>;
  if (allMunicipalityList && allMunicipalityList.length > 0) {
    municipalityListDropdown = allMunicipalityList.map((munRow, index) => (
      <option value={munRow.urbanCode}>{munRow.urbanName}</option>
    ));
  }

  const onBlock = (e) => {
    setBlock(e.target.value)
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  }

  let GpListDropdown = <option>Loading...</option>;
  if (allGpList && allGpList.length > 0) {
    GpListDropdown = allGpList.map((gpRow, index) => (
      <option value={gpRow.gpCode}>{gpRow.gpName}</option>
    ));
  }

  return (
    <div className="flex flex-grow flex-col space-y-16 p-6 px-12">
      <div className="p-4 px-8 shadow-md rounded">
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
              <Link
                to="/dashboard"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Home
              </Link>
              /
            </li>
            <li className="text-gray-500 font-bold" aria-current="page">
              Contractor Master
            </li>
          </ol>
        </nav>
      </div>
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
              onChange={onArea}
            >
              <option value="" selected hidden>Select Scheme Name</option>
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
              District   
               <span className="text-red-500 "> * </span>

            </label>
            <select
              id="scheme_name"
              name="scheme_name"
              autoComplete="off"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={onDistrict}

            >
              <option value="" selected hidden>Select District List</option>
              {districtListDropdown}


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
              <option value="" selected hidden>Select Municipality List</option>
              {municipalityListDropdown}

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
              onChange={onBlock}

            >
              <option value="" selected hidden>Select Block List</option>
              {blockListDropdown}

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
              <option value="" selected hidden>Select GP List</option>
              {GpListDropdown}

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
              Contractor Name * Only Alphabel and White Space allow
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
              Contractor GSTIN * (placeholder="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$")
            </label>
            <input
              id="scheme_name"
              name="scheme_name"
              type="text"
              autoComplete="off"
              placeholder="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Contractor PAN * ( /[A-Z]{5}[0-9]{4}[A-Z]{1}$/; )
            </label>
            <input
              id="scheme_name"
              name="scheme_name"
              type="text"
              autoComplete="off"
              placeholder=" /[A-Z]{5}[0-9]{4}[A-Z]{1}$/; "
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required
            />
          </div>
          <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Contractor Mobile * (/[6-9]{1}[0-9]{9}$/)
            </label>
            <input
              id="scheme_name"
              name="scheme_name"
              type="text"
              autoComplete="off"
              placeholder=" /[6-9]{1}[0-9]{9}$/; "
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required
            />
          </div>
        </div>
        <div className="flex flex-col w-full mb-4">
          <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Contractor Address * Validation Alpha Numuric, White Space  and Special Character (,/)
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
              Village Name/Word no  * Validation Alpha Numuric, White Space  and Special Character (,/)
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
              Police Station  * Validation Alpha Numuric, White Space  and Special Character (/)
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
              Post Office  * Validation Alpha Numuric, White Space  and Special Character (,/)
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
        <div className="flex w-full space-x-4 flex-col mb-4 ">

          <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Pin  * Validation  Numuric (/[7]{1}[0-9]{5}$/)
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
  );
};

export default Contractor;
