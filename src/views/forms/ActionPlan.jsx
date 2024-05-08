import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ActionPlan = () => {
  const jsonString = localStorage.getItem("karmashree_User");
  const data = JSON.parse(jsonString);

  const [schemeArea, setSchemeArea] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [district, setDistrict] = useState("");
  const [allBlockList, setAllBlockList] = useState([]);
  const [block, setBlock] = useState("");
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [allGpList, setAllGpList] = useState([]);
  const [gp, setGp] = useState("");
  const [allSectorList, setAllSectorList] = useState([]);
  const [sector, setSector] = useState("");
  const navigate = useNavigate();

  const [schemeProposed, setSchemeProposed] = useState("");
  const [costOfSCheme, setCostOfSCheme] = useState("");
  const [totalWages, setTotalWages] = useState("");
  const [totalPersonDays, setTotalPersonDays] = useState("");
  const [totalJobCard, setTotalJobCard] = useState("");
  const [totalAverageDays, setTotalAverageDays] = useState("");
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    `${currentYear}-${currentYear + 1}`
  );

  const lastTenYears = Array.from({ length: 10 }, (_, index) => {
    const startYear = currentYear - index;
    return `${startYear}-${startYear + 1}`;
  });

  const onFinancialYear = (event) => {
    console.log(event.target.value, "fififififi");
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    getAllDistrictActionList().then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });

    getAllSectorActionList().then(function (result) {
      const response = result?.data?.result;
      setAllSectorList(response);
    });
  }, []);

  //DISTRICT LIST

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }

  let sectorListDropdown = <option>Loading...</option>;
  if (allSectorList && allSectorList.length > 0) {
    sectorListDropdown = allSectorList.map((secRow, index) => (
      <option value={secRow.sectorid}>{secRow.sectorname}</option>
    ));
  }

  const onSchemeArea = (e) => {
    setSchemeArea(e.target.value);
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

  const onMunicipality = (e) => {
    setMunicipality(e.target.value);
  };

  const onGramPanchayat = (e) => {
    setGp(e.target.value);
  };

  const onSector = (e) => {
    setSector(e.target.value);
  };

  const onSchemeProposed = (e) => {
    setSchemeProposed(e.target.value);
  };

  const onCostOfSCheme = (e) => {
    setCostOfSCheme(e.target.value);
  };

  const onTotalWages = (e) => {
    setTotalWages(e.target.value);
  };

  const onTotalPersonDays = (e) => {
    setTotalPersonDays(e.target.value);
  };

  const onTotalJobCard = (e) => {
    setTotalJobCard(e.target.value);
  };

  const onTotalAverageDays = (e) => {
    setTotalAverageDays(e.target.value);
  };

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

  const onRegister = () => {
    if (schemeArea === "") {
      toast.error("Please Select Scheme Area");
    } else if (district === "") {
      toast.error("Please Select District");
      // } else if (schemeArea === "U" && municipality === "") {
      //   toast.error("Please Select Municipality");
      // } else if (schemeArea === "R" && block === "") {
      //   toast.error("Please Select Block");
      // } else if (schemeArea === "R" && gp === "") {
      //   toast.error("Please Select Gram Panchayat");
    } else if (sector === "") {
      toast.error("Please Select Sector");
    } else if (schemeProposed === "") {
      toast.error("Please Type No of Schemes Proposed");
    } else if (costOfSCheme === "") {
      toast.error("Please Type Tentative Total Cost of Schemes");
    } else if (totalWages === "") {
      toast.error("Please Type Tentative Total Wage to be paid in the Schemes");
    } else if (totalWages >costOfSCheme) {
      toast.error("Total Wage cant greater than Total Cost");
    }else if (totalPersonDays === "") {
      toast.error("Please Type Total Persondays to be Generated");
    } else if (totalJobCard === "") {
      toast.error("Please Type Total no. of Job Card Holders to be engaged");
    } else if (totalAverageDays === "") {
      toast.error(
        "Please Type Average Days of Employment to be provided per family"
      );
    } else {
      addCreateAction(
        schemeArea,
        district,
        municipality,
        block,
        gp,
        sector,
        schemeProposed,
        costOfSCheme,
        totalWages,
        totalPersonDays,
        totalJobCard,
        totalAverageDays,
        selectedYear,
        currentMonth,
        currentYear,
        data?.departmentNo,
        data?.userIndex,
        (r) => {
          console.log(r, "response");
          if (r.errorCode == 0) {
            toast.success(r.message);
            navigate("/dashboard/action-plan-list");
          } else {
            toast.error(r.message);
          }
        }
      );
    }
  };
  return (
    <div className="flex-grow">
      <ToastContainer />
      <div className="mx-auto mt-2">
        <div className="bg-white rounded-lg p-1 text-sm px-2">
          <div className="shadow-md mb-4">
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

          <div className="bg-white shadow-md rounded-lg px-16 pb-8 mb-8">
            <div className="flex flex-col w-full space-y-3 mb-6">
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Financial Year
                </label>
                {/* <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter No of Schemes Proposed"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  // onChange={onSchemeProposed}
                  value={financialYear}
                /> */}
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onFinancialYear}
                  value={selectedYear}
                >
                  {lastTenYears.map((yearRange) => (
                    <option key={yearRange} value={yearRange}>
                      {yearRange}
                    </option>
                  ))}
                </select>
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Scheme Area
                  <span className="text-red-500 "> * </span>
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onSchemeArea}
                >
                  <option selected hidden>
                    Select Scheme area
                  </option>
                  <option value="R">Rural</option>
                  <option value="U">Urban</option>
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
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onDistrict}
                >
                  <option selected hidden>
                    Select District
                  </option>
                  {districtListDropdown}
                </select>
              </div>

              {district.length > 0 && schemeArea === "U" ? (
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Municipality/Development Authority
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                    onChange={onMunicipality}
                  >
                    <option selected hidden>
                      Select Municipality/Development Authority
                    </option>
                    {municipalityListDropdown}

                    {/* Add more options as needed */}
                  </select>
                </div>
              ) : (
                ""
              )}

              {district.length > 0 && schemeArea === "R" ? (
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Block
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                    onChange={onBlock}
                  >
                    <option selected hidden>
                      Select Block
                    </option>
                    {blockListDropdown}
                  </select>
                </div>
              ) : (
                ""
              )}

              {block.length > 0 && schemeArea === "R" ? (
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gram Panchayat
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                    onChange={onGramPanchayat}
                  >
                    <option selected hidden>
                      Select Gram Panchayat
                    </option>
                    {GpListDropdown}
                  </select>
                </div>
              ) : (
                ""
              )}

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type of Sector
                  <span className="text-red-500 "> * </span>
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onSector}
                >
                  <option selected hidden>
                    Select Sector
                  </option>
                  {sectorListDropdown}
                </select>
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Schemes Proposed
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter No of Schemes Proposed"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onSchemeProposed}
                />
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="flex text-sm items-center space-x-2 font-medium text-gray-700 w-fit"
                >
                  <span> Tentative Total Cost of Schemes</span>
                  <span className="text-red-500 "> * </span>
                  <span>( Cost in</span>
                  <Icon className="text-xs" icon={"fa:rupee"} /> upees )
                </label>
                <input
                  id="scheme_cost"
                  name="scheme_cost"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Tentative Total Cost of Schemes"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onCostOfSCheme}
                />
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="flex text-sm items-center space-x-2 font-medium text-gray-700 w-fit"
                >
                  <span> Tentative Total Wage to be paid in the Schemes</span>                  
                  <span className="text-red-500 "> * </span>
                  <span>( Cost in</span>
                  <Icon className="text-xs" icon={"fa:rupee"} /> upees )
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Tentative Total Wage to be paid in the Schemes"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onTotalWages}
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Persondays to be Generated
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Total Persondays to be Generated"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onTotalPersonDays}
                />
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total no. of Job Card Holders to be engaged
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Total no. of Job Card Holders to be engaged"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onTotalJobCard}
                />
              </div>

              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Average Days of Employment to be provided per family
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Average Days of Employment to be provided per family"
                  className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                  onChange={onTotalAverageDays}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="w-1/5 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onRegister}
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

export default ActionPlan;
