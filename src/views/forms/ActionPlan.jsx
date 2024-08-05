import React, { useState, useEffect } from "react";
import SuccessModal from "../../components/SuccessModal";
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
import {
  getAllPedastalList,
  getAllDepartmentList,
} from "../../Service/NewUserService";
import BreadCrumb from "../../components/BreadCrumb";
const ActionPlan = () => {
  const jsonString = sessionStorage.getItem("karmashree_User");
  const data = JSON.parse(jsonString);
  const [userData, setUserData] = useState(null);
  const [schemeArea, setSchemeArea] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [district, setDistrict] = useState();
  const [allBlockList, setAllBlockList] = useState([]);
  const [block, setBlock] = useState();
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState();
  const [allGpList, setAllGpList] = useState([]);
  const [gp, setGp] = useState();
  const [allSectorList, setAllSectorList] = useState([]);
  const [sector, setSector] = useState("");
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [allDepartmentList, setAllDepartmentList] = useState([]);
  const [allPedastralList, setAllPedastralList] = useState([]);
  const [parastatals, setParastatals] = useState();
  const [schemeProposed, setSchemeProposed] = useState("");
  const [costOfSCheme, setCostOfSCheme] = useState("");
  const [totalWages, setTotalWages] = useState("");
  const [totalPersonDays, setTotalPersonDays] = useState("");
  const [totalJobCard, setTotalJobCard] = useState("");
  const [totalAverageDays, setTotalAverageDays] = useState("");
  // const [checkParastatal, setCheckParastatal] = useState([]);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    `${currentYear}-${currentYear + 1}`
  );
  const [openModal, setOpenModal] = useState(false);
  const lastTenYears = Array.from({ length: 10 }, (_, index) => {
    const startYear = currentYear - index;
    return `${startYear}-${startYear + 1}`;
  });
  const onFinancialYear = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    const jsonString = sessionStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);
    getAllDepartmentList(data?.departmentNo).then(function (result) {
      const response = result?.data?.result;
      setAllDepartmentList(response);
    });
    //Parastatals  list
    getAllPedastalList(
      data?.departmentNo,
      userData?.category === "HQ" || userData?.category === "HD"
        ? 0
        : data?.deptWing
    ).then(function (result) {
      const response = result?.data?.result;
      setAllPedastralList(response);
    });

    getAllDistrictActionList().then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });

    getAllSectorActionList().then(function (result) {
      const response = result?.data?.result;
      setAllSectorList(response);
    });

    // if (allPedastralList?.length == 0) {
    //   toast.error("Please add Parastatals")
    // }
  }, []);
  //

  //Department list
  let departmentListDropdown = <option>No data found...</option>;
  if (allDepartmentList && allDepartmentList.length > 0) {
    departmentListDropdown = allDepartmentList.map((deptRow, index) => (
      <option value={deptRow.departmentNo}>{deptRow.departmentName}</option>
    ));
  }

  //Parastatals list
  let pedastralDropdown = <option>No data found...</option>;
  if (allPedastralList && allPedastralList.length > 0) {
    pedastralDropdown = allPedastralList.map((peddivRow, index) => (
      <option value={peddivRow.id}>{peddivRow.pedestalName}</option>
    ));
  }

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

    getAllMunicipalityList(e.target.value, 0).then(function (result) {
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
    // setSchemeProposed(e.target.value);
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setSchemeProposed(value);
    }
  };

  const onCostOfSCheme = (e) => {
    // setCostOfSCheme(e.target.value);
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setCostOfSCheme(value);
    }
  };

  const onTotalWages = (e) => {
    // setTotalWages(e.target.value);
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setTotalWages(value);
    }
  };

  const onTotalPersonDays = (e) => {
    // setTotalPersonDays(e.target.value);
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setTotalPersonDays(value);
    }
  };

  const onTotalJobCard = (e) => {
    // setTotalJobCard(e.target.value);
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setTotalJobCard(value);
    }
  };

  const onTotalAverageDays = (e) => {
    // setTotalAverageDays(e.target.value);
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setTotalAverageDays(value);
    }
  };

  const onDepartment = (e) => {
    setDepartment(e.target.value);
    getAllPedastalList(e.target.value, userData?.deptWing).then(function (
      result
    ) {
      const response = result?.data?.result;
      setAllPedastralList(response);
    });
  };

  const onParastatals = (e) => {
    setParastatals(e.target.value);
  };

  const getCurrentFinancialYear = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    let financialYear = "";
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
  const onRegister = () => {
    if (userData?.category === "HQ" && department === "") {
      toast.error("Please select a Department");
    }
    // else if (userData?.category === "HQ" && !parastatals ||
    //   userData?.category === "HD" && !parastatals
    // ) {
    //   toast.error("Please select a Parastatal");
    // }
    else if (schemeArea === "") {
      toast.error("Please Select Scheme Area");
    } else if (!district) {
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
    } else if (parseInt(totalWages) > parseInt(costOfSCheme)) {
      toast.error("Total Wage cant greater than Total Cost");
    } else if (totalPersonDays === "") {
      toast.error("Please Type Total Persondays to be Generated");
    } else if (totalJobCard === "") {
      toast.error("Please Type Total no. of Job Card Holders to be engaged");
    } else if (totalAverageDays === "") {
      toast.error(
        "Please Type Average Days of Employment to be provided per family"
      );
    } else {
      addCreateAction(
        department ? department : userData?.departmentNo,
        parastatals ? parastatals : userData?.deptWing,
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
        data?.userIndex,
        (r) => {
          if (r.errorCode == 0) {
            setOpenModal(true);
          } else {
            toast.error(r.message);
          }
        }
      );
    }
  };
  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={"Action Plan Created Successfully"}
        to="action-plan-list"
        // resetData={resetData}
        isSuccess={true}
      />
      <div className="flex-grow">
        <ToastContainer />
        <div className="mx-auto">
          <div className="bg-white rounded-lg text-sm">
            <div className="bg-white shadow-md rounded-lg px-12 pb-8 mb-8">
              <BreadCrumb page={"Action Plan"} />
              <div className="flex flex-col w-full space-y-3 mb-6">
                <div className="flex items-center px-4 space-x-4">
                  <div className="w-1/3">
                    <label
                      htmlFor="scheme_name"
                      className="block font-medium text-gray-700"
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
                      className="mt-1 px-2  block w-full border border-gray-300 rounded-md"
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

                  <div className="w-1/3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                      <span className="text-red-500 "> * </span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      onChange={onDepartment}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    >
                      <option value="" selected hidden>
                        {userData?.category === "HQ"
                          ? "Select a Department"
                          : departmentListDropdown}
                      </option>
                      {departmentListDropdown}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Parastatals
                      {/* <span className="text-red-500 "> * </span> */}
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      onChange={onParastatals}
                      className="mt-1 p-2 w-full block border border-gray-300 rounded-md"
                    >
                      <option value="" selected>
                        {userData?.category === "HQ" ||
                        userData?.category === "HD"
                          ? "Select a Parastatals"
                          : pedastralDropdown}
                      </option>
                      {pedastralDropdown}
                    </select>
                  </div>
                </div>

                <div className="flex px-4 space-x-4">
                  <div className="w-1/4">
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

                  <div className="w-1/4">
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

                  {district?.length > 0 && schemeArea === "U" ? (
                    <div className="w-1/4">
                      <label
                        htmlFor="scheme_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Municipality/Development Authority
                        {/* <span className="text-red-500 "> * </span> */}
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

                  {district?.length > 0 && schemeArea === "R" ? (
                    <div className="w-1/4">
                      <label
                        htmlFor="scheme_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Block
                        {/* <span className="text-red-500 "> * </span> */}
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

                  {block?.length > 0 && schemeArea === "R" ? (
                    <div className="w-1/4">
                      <label
                        htmlFor="scheme_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gram Panchayat
                        {/* <span className="text-red-500 "> * </span> */}
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
                </div>

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
                    value={schemeProposed}
                  />
                </div>

                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="flex text-sm items-center space-x-2 font-medium text-gray-700 w-fit"
                  >
                    <span> Tentative Total Cost of Schemes</span>
                    <span className="text-red-500 "> * </span>
                    <span>(in &nbsp;</span>
                    Rupees
                    <Icon className="text-xs" icon={"fa:rupee"} /> )
                  </label>
                  <input
                    id="scheme_cost"
                    name="scheme_cost"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Tentative Total Cost of Schemes in Rupees..."
                    className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                    onChange={onCostOfSCheme}
                    value={costOfSCheme}
                  />
                </div>

                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="flex text-sm items-center space-x-2 font-medium text-gray-700 w-fit"
                  >
                    <span> Tentative Total Wage to be paid in the Schemes</span>
                    <span className="text-red-500 "> * </span>
                    <span>(in &nbsp;</span>
                    Rupees
                    <Icon className="text-xs" icon={"fa:rupee"} /> )
                  </label>
                  <input
                    id="scheme_name"
                    name="scheme_name"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Tentative Total Wage to be paid in the Schemes in Rupess..."
                    className="mt-1 p-1 text-sm px-2  block w-full border border-gray-300 rounded-md"
                    onChange={onTotalWages}
                    value={totalWages}
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
                    value={totalPersonDays}
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
                    value={totalJobCard}
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
                    value={totalAverageDays}
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
    </>
  );
};

export default ActionPlan;
