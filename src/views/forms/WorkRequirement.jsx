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
  getAllGramPanchayatList
} from "../../Service/ActionPlan/ActionPlanService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllContractorList, getSchemeList } from "../../Service/Scheme/SchemeService";
import { addCreateWorkRequirement } from "../../Service/WorkRequirement/WorkRequirementService";
import { useNavigate } from "react-router-dom";

const WorkRequirement = () => {
  const navigate = useNavigate();
  const jsonString = localStorage.getItem("karmashree_User");
  const data = JSON.parse(jsonString);
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [area, setArea] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [gp, setGP] = useState("");
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
  const [allData, setAllData] = useState(0)
  const [unSkilled, setUnSkilled] = useState("")
  const [allSchemeList, setAllSchemeList] = useState([]);
  const [scheme, setScheme] = useState("")
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  console.log(allSchemeList, "allSchemeList")
  console.log(allData, "allData")

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

    getSchemeList().then(function (result) {
      const response = result?.data?.result;
      setAllSchemeList(response);
    });
  }, []);

  //Scheme list

  let schemeListDropdown = <option>Loading...</option>;
  if (allSchemeList && allSchemeList.length > 0) {
    schemeListDropdown = allSchemeList.map((schemeRow, index) => (
      <option value={schemeRow.scheme_sl}>{schemeRow.schemename}</option>
    ));
  }

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
  const onMunicipality = (e) => {
    console.log(e.target.value, "municipality");
    setMunicipality(e.target.value);
  };

  const onGP = (e) => {
    setGP(e.target.value);
  };

  const onBlock = (e) => {
    setBlock(e.target.value);
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  };

  const onScheme = (e) => {
    setScheme(e.target.value)
  }

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

  const getCurrentFinancialYear = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    let financialYear = "";
    console.log(currentMonth);
    console.log(currentYear);

    // Financial year starts from April
    if (currentMonth >= 4) {
      financialYear =
        currentYear.toString() + "-" + (currentYear + 1).toString();
    } else {
      financialYear =
        (currentYear - 1).toString() + "-" + currentYear.toString();
    }

    return financialYear;
  };

  const financialYear = getCurrentFinancialYear();
  console.log(financialYear, "financialYear");
  console.log(currentMonth, "currentMonth");
  console.log(currentYear, "currentYear");

  const handleToggle = (a, financialYear, currentMonth, currentYear, index, date) => {
    setUnSkilled(a.target.value)
    const value = a.target.value; // Convert the string to a boolean
    console.log(value, index, date, "value")

    setAllData(prevState => ({
      ...prevState,
      [index]: {
        "unskilledWorkers": value,
        "skilledWorkers": 0,
        "semiSkilledWorkers": 0,
        "finYearWork": financialYear,
        "currentMonthWork": currentMonth,
        "currentYearWork": currentYear,
        "dateofwork": date,
      }

    }));
  };


  const onSubmit = () => {

    if (area === "") {
      toast.error("Please Select Area Type");
    } else if (district === "") {
      toast.error("Please Select District");
    } else if (area === "U" && municipality === "") {
      toast.error("Please Select Municipality");
    } else if (area === "R" && block === "") {
      toast.error("Please Select Block");
    } else if (area === "R" && gp === "") {
      toast.error("Please Select Gram Panchayat");
    } else if (scheme === "") {
      toast.error("Please Select Scheme List");

    } else if (villageName === "") {
      toast.error("Please Type Village Name");

    } else if (contractor === "") {
      toast.error("Please Select Contractor List");

    } else if (personName === "") {
      toast.error("Please Type Contact Person Name");

    } else if (phoneNumber === "") {
      toast.error("Please Type Contact Phone Number");

    } else if (reportingPlace === "") {
      toast.error("Please Type Reporting Place");

    } else if (nearestLandmark === "") {
      toast.error("Please Type Nearest Landmark");

    } else if (unSkilled === "" || unSkilled === "0") {
      toast.error("Please Enter Valid Unskilled Value");
    }
    else if (
      allData[0]?.unskilledWorkers === "" || allData[0]?.unskilledWorkers === 0 ||
      allData[1]?.unskilledWorkers === "" || allData[1]?.unskilledWorkers === 0 ||
      allData[2]?.unskilledWorkers === "" || allData[2]?.unskilledWorkers === "0" ||
      allData[3]?.unskilledWorkers === "" || allData[3]?.unskilledWorkers === "0" ||
      allData[4]?.unskilledWorkers === "" || allData[4]?.unskilledWorkers === "0" ||
      allData[5]?.unskilledWorkers === "" || allData[5]?.unskilledWorkers === "0" ||
      allData[6]?.unskilledWorkers === "" || allData[6]?.unskilledWorkers === "0" ||
      allData[7]?.unskilledWorkers === "" || allData[7]?.unskilledWorkers === "0" ||
      allData[8]?.unskilledWorkers === "" || allData[8]?.unskilledWorkers === "0" ||
      allData[9]?.unskilledWorkers === "" || allData[9]?.unskilledWorkers === "0" ||
      allData[10]?.unskilledWorkers === "" || allData[10]?.unskilledWorkers === "0" ||
      allData[11]?.unskilledWorkers === "" || allData[11]?.unskilledWorkers === "0" ||
      allData[12]?.unskilledWorkers === "" || allData[12]?.unskilledWorkers === "0" ||
      allData[13]?.unskilledWorkers === "" || allData[13]?.unskilledWorkers === "0"
    ) {
      toast.error("Please Enter Valid Unskilled Value");
    }
    else {
      const createworkalloDto = [];
      Object.values(allData).map((data) => (
        createworkalloDto.push(data)
      ))

      addCreateWorkRequirement(area, data?.departmentNo, district, municipality,
        block, gp, villageName, scheme, contractor, personName, phoneNumber, reportingPlace,
        nearestLandmark, startDate, days, currentMonth, currentYear, financialYear, data?.userIndex, createworkalloDto,
        (r) => {
          console.log(r, "response");
          if (r.errorCode == 0) {
            toast.success(r.message);
            navigate("/dashboard/work-requirement-list");
          } else {
            toast.error(r.message);
          }
        }
      )
    }


  }


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
              <option value="" selected >
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
              <option value="" selected >
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
                onClick={onMunicipality}

              >
                <option value="" selected>
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
                <option value="" selected >
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
                onClick={onGP}
              >
                <option value="" selected >
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
                onChange={onScheme}
              >
                <option value="">-select scheme-</option>
                {schemeListDropdown}
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
                placeholder="Please Enter Village Name"
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
                placeholder="Please Enter Contact Person Name"

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
                placeholder="Please Enter Contact Phone Number"
              />
              {!isValidMobile && (
                <div style={{ color: 'red' }}>Please enter a valid Contact Phone Number</div>
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
                placeholder="Please Enter Reporting Place"
              />
              {!isValidReportingPlace && (
                <div style={{ color: 'red' }}>Please enter a valid Reporting Place</div>
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
                placeholder="Please Enter Nearest Landmark"
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
              <Table.HeadCell hidden className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Semi-Skill
              </Table.HeadCell>
              <Table.HeadCell hidden className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
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
                      placeholder="Please Enter Unskilled"
                      defaultValue="0"
                      onChange={(a) => handleToggle(a, financialYear, currentMonth, currentYear, index, e.toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }))}

                    />
                  </Table.Cell>
                  <Table.Cell hidden className="">0</Table.Cell>
                  <Table.Cell hidden className="">0</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="button"
            className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkRequirement;
