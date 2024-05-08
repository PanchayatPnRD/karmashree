import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Table } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getDatesArray } from "../../functions/dateCalc";
import {
  getAllDistrictActionList,
  getAllBlockList,
  getAllMunicipalityList,
  getAllGramPanchayatList,
  getAllSectorActionList,
  addCreateAction,
} from "../../Service/ActionPlan/ActionPlanService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllContractorList,

} from "../../Service/Scheme/SchemeService";
const WorkRequirement = () => {
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dates, setDates] = useState([]);

  const [area, setArea] = useState();

  const [allDistrictList, setAllDistrictList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);

  const [allBlockList, setAllBlockList] = useState([]);
  const [block, setBlock] = useState("");
  const [district, setDistrict] = useState("");
  const [allGpList, setAllGpList] = useState([]);
  const [villageName, setVillageName] = useState("");
  const [isValidVillageName, setIsValidVillageName] = useState(true);
  const [allContractorList, setAllContractorList] = useState([]);
  const [contractor, setContractor] = useState("");
  const [personName, setPersonaName] = useState("");
  const [isValidContractorName, setIsValidContractorName] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [reportingPlace, setReportingPlace] = useState("");
  const [isValidReportingPlace, setIsValidReportingPlace] = useState(true);
  const [nearestLandmark, setNearestLandmark] = useState("");
  const [isValidNearestLandmark, setIsValidNearestLandmark] = useState(true);

  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    // setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });

    getAllContractorList().then(function (result) {
      const response = result?.data?.result;
      setAllContractorList(response);
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
    setArea(e.target.value);
  };

  const onDistrict = (e) => {
    setDistrict(e.target.value);
    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });

    getAllMunicipalityList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllMunicipalityList(response);
    });
  };

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
    setBlock(e.target.value);
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  };

  let GpListDropdown = <option>Loading...</option>;
  if (allGpList && allGpList.length > 0) {
    GpListDropdown = allGpList.map((gpRow, index) => (
      <option value={gpRow.gpCode}>{gpRow.gpName}</option>
    ));
  }


  //Contractor list
  let contractorListDropdown = <option>Loading...</option>;
  if (allContractorList && allContractorList.length > 0) {
    contractorListDropdown = allContractorList.map((ContRow, index) => (
      <option value={ContRow.cont_sl}>{ContRow.contractorNameGst}</option>
    ));
  }


  const onVillageName = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === '') {
      setVillageName(value);
      setIsValidVillageName(true);
    } else {
      setIsValidVillageName(false);
    }
  }

  const onContractor = (e) => {
    setContractor(e.target.value);
  };

  const onPersonName = (e) => {
    const value = e.target.value;
    // Regular expression to allow only alphabets and white spaces
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(value) || value === '') {
      setPersonaName(value);
      setIsValidContractorName(true)
    } else {
      setIsValidContractorName(false)
      // toast.error("Please use only Alphabet characters")

    }
  };

  const handleKeyDown = (event) => {
    // Allow only alphabets and white spaces
    if (
      !(
        (event.keyCode >= 65 && event.keyCode <= 90) || // A-Z
        (event.keyCode >= 97 && event.keyCode <= 122) || // a-z
        event.keyCode === 32 || event.key === "Backspace"
      )
    ) {
      event.preventDefault();
    }
  }

  const onContactPhoneNumber = (event) => {
    const value = event.target.value;
    const regex = /^[6-9]{1}[0-9]{9}$/;
    if (regex.test(value) || value === '') {
      setPhoneNumber(value);
      setIsValidMobile(true);
    } else {
      setIsValidMobile(false);
    }
  };

  const onReportingPlace = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === '') {
      setReportingPlace(value);
      setIsValidReportingPlace(true);
    } else {
      setIsValidReportingPlace(false);
    }
  };

  const onNearestLandmark = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === '') {
      setNearestLandmark(value);
      setIsValidNearestLandmark(true);
    } else {
      setIsValidNearestLandmark(false);
    }
  };

  useEffect(() => {
    setDates(getDatesArray(startDate, days));
  }, [days, startDate]);

  return (
    <div className="flex flex-grow flex-col space-y-16 p-1 px-12">
      <ToastContainer />
      <div className="p-4 shadow-md rounded">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4 px-4 py-1">
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
              Work Requirement
            </li>
          </ol>
        </nav>
      </div>
      <div className="bg-white shadow-md rounded-lg px-12 pb-12">
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
              <option value="" selected hidden>
                Select Scheme Name
              </option>
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
              <option value="" selected hidden>
                Select District List
              </option>
              {districtListDropdown}

              {/* Add more options as needed */}
            </select>
          </div>
          {district.length > 0 && area === "U" ? (
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
                <option value="" selected hidden>
                  Select Municipality List
                </option>
                {municipalityListDropdown}

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}

          {district.length > 0 && area === "R" ? (
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
                <option value="" selected hidden>
                  Select Block List
                </option>
                {blockListDropdown}

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}

          {block.length > 0 && area === "R" ? (
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
                <option value="" selected hidden>
                  Select GP List
                </option>
                {GpListDropdown}

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col w-full mb-4 space-y-4">
          <div className="flex w-full">
            <div className="px-4 w-1/2">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Scheme List
              </label>
              <select
                name=""
                id=""
                className="w-full rounded-md border-zinc-300"
              >
                <option value="">-select scheme-</option>
              </select>
            </div>

            <div className="px-4 w-1/2">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Village Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border-zinc-300"
                onChange={onVillageName}
              />
               {!isValidVillageName && (
                <div style={{ color: 'red' }}>Please enter a valid Village Name</div>
              )}
            </div>
          </div>
          <div className="flex w-full">
            <div className="px-4 w-1/3">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Contractor List
              </label>
              <select
                name=""
                id=""
                className="w-full rounded-md border-zinc-300"
                onChange={onContractor}
              >
                <option value="">-select scheme-</option>
                {contractorListDropdown}
              </select>
            </div>

            <div className="px-4 w-1/3">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Person Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border-zinc-300"
                onChange={onPersonName}
                onKeyDown={handleKeyDown}
              />
              {!isValidContractorName && (
                <div style={{ color: 'red' }}>Please enter a valid Contact Person Name</div>
              )}
            </div>
            <div className="px-4 w-1/3">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Phone Number
              </label>
              <input
                type="text"
                className="w-full rounded-md border-zinc-300"
                onChange={onContactPhoneNumber}
                maxLength={10}
              />
              {!isValidMobile && (
                <div style={{ color: 'red' }}>Please enter a valid Contact Phone number</div>
              )}
            </div>
          </div>
          <div className="flex w-full">
            <div className="px-4 w-1/2">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Reporting Place
              </label>
              <input
                type="text"
                className="w-full rounded-md border-zinc-300"
                onChange={onReportingPlace}
                />
                {!isValidReportingPlace && (
                  <div style={{ color: 'red' }}>Please enter a valid Reporting place</div>
                )}
            </div>

            <div className="px-4 w-1/2">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nearest Landmark
              </label>
              <input
                type="text"
                className="w-full rounded-md border-zinc-300"
                onChange={onNearestLandmark}
                />
                {!isValidNearestLandmark && (
                  <div style={{ color: 'red' }}>Please enter a valid Nearest Landmark</div>
                )}
            </div>
          </div>
          <div className="flex w-full">
            <div className="px-4 w-1/5 flex flex-col">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <DatePicker
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="w-full border border-gray-300 rounded-md "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="px-4 w-1/6">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                No of Days
              </label>
              <div className="border rounded-md border-zinc-300 flex items-center h-10 justify-around">
                <button
                  className="text-3xl text-zinc-400 hover:text-zinc-600"
                  onClick={() => {
                    if (days >= 2) setDays((e) => e - 1);
                  }}
                >
                  <Icon icon={"ic:round-minus"} />
                </button>
                <span className="text-md font-semibold text-zinc-800 w-4">
                  {days}
                </span>
                <button
                  className="text-3xl text-zinc-400 hover:text-zinc-600"
                  onClick={() => {
                    if (days <= 13) setDays((e) => e + 1);
                  }}
                >
                  <Icon icon={"ic:round-add"} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Table className="w-full">
            <Table.Head>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case w-20">
                #
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case">
                Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case rounded-tr-lg">
                Unskill
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case hidden">
                Semi-Skill
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case hidden">
                Skill
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {dates.map((e, index) => (
                <Table.Row>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="text-zinc-800">
                    {e.toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <input
                      type="number"
                      className="rounded-md border-zinc-300"
                    />
                  </Table.Cell>
                  <Table.Cell className="hidden">0</Table.Cell>
                  <Table.Cell className="hidden">0</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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

export default WorkRequirement;
