import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import {
  getAllDistrictActionList,
  getAllBlockList,
  getAllMunicipalityList,
  getAllGramPanchayatList,
  getAllSectorActionList,
  addCreateAction,
} from "../../Service/ActionPlan/ActionPlanService";
import { getAllDepartmentList } from "../../Service/NewUserService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getAllContractorList,
  addCreateScheme,
  getSchemeViewDetails,
} from "../../Service/Scheme/SchemeService";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";
import { useParams } from "react-router-dom";

const SchemeEdit = () => {
  const { schemeID } = useParams();
  const navigate = useNavigate();
  const jsonString = localStorage.getItem("karmashree_User");
  const data = JSON.parse(jsonString);
  const [openModal, setOpenModal] = useState(false);
  const [area, setArea] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState();
  const [allBlockList, setAllBlockList] = useState([]);
  const [gp, setGP] = useState();
  const [block, setBlock] = useState();
  const [district, setDistrict] = useState();
  const [allGpList, setAllGpList] = useState([]);
  const [sector, setSector] = useState("");
  const [allSectorList, setAllSectorList] = useState([]);
  const [schemeName, setSchemeName] = useState("");
  const [isValidSchemeName, setIsValidSchemeName] = useState(true);
  const [Location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [allDepartmentList, setAllDepartmentList] = useState([]);
  const [status, setStatus] = useState("");
  const [tentativeWorkStartDate, setTentativeWorkStartDate] = useState(
    new Date()
  );

  const [expectedWorkDate, setExpectedWorkDate] = useState();
  const [projectCost, setProjectCost] = useState("");
  const [totalWages, setTotalWages] = useState("");
  const [persondaysWork, setPersondaysWork] = useState("");
  const [unskilled, setUnskilled] = useState("");
  const [semiskilled, setSemiskilled] = useState("");
  const [skilled, setSkilled] = useState("");
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [isValidWorkOrderNumber, setIsValidWorkOrderNumber] = useState(true);
  const [workOrderDate, setWorkOrderDate] = useState(new Date());
  const [allContractorList, setAllContractorList] = useState([]);
  const [contractor, setContractor] = useState("");
  const [remark, setRemark] = useState("");
  const [isValidRemark, setIsValidRemark] = useState(true);
  const [userData, setUserData] = useState(null);
  const [schemeId, setSchemeId] = useState();
  const [schemeDetails, setSchemeDetails] = useState();
  const [allData, setAllData] = useState({
    workorderNo: "",
    shortName: "",
    overview: "",
  });
  console.log(allData, "ALLDATA");

  console.log(schemeDetails, "schemeDetails");
  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });

    getAllSectorActionList().then(function (result) {
      const response = result?.data?.result;
      setAllSectorList(response);
    });

    getAllDepartmentList(0).then(function (result) {
      const response = result?.data?.result;
      setAllDepartmentList(response);
    });

    getAllContractorList().then(function (result) {
      const response = result?.data?.result;
      setAllContractorList(response);
    });

    getSchemeViewDetails(schemeID).then(function (result) {
      const response = result?.data?.masterScheme;
      setAllData(response);
      setSchemeDetails(response);
    });
  }, []);

  console.log(allContractorList, "allContractorList");
  //District list

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }

  //sector list

  let sectorListDropdown = <option>Loading...</option>;
  if (allSectorList && allSectorList.length > 0) {
    sectorListDropdown = allSectorList.map((secRow, index) => (
      <option value={secRow.sectorid}>{secRow.sectorname}</option>
    ));
  }

  //Department list
  let departmentListDropdown = <option>Loading...</option>;
  if (allDepartmentList && allDepartmentList.length > 0) {
    departmentListDropdown = allDepartmentList.map((deptRow, index) => (
      <option value={deptRow.departmentNo}>{deptRow.departmentName}</option>
    ));
  }

  //Contractor list
  let contractorListDropdown = <option>Loading...</option>;
  if (allContractorList && allContractorList.length > 0) {
    contractorListDropdown = allContractorList.map((ContRow, index) => (
      <option value={ContRow.cont_sl}>{ContRow.contractorNameGst}</option>
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

  const onGP = (e) => {
    setGP(e.target.value);
  };

  const onMunicipality = (e) => {
    console.log(e.target.value, "municipality");
    setMunicipality(e.target.value);
  };

  const onSector = (e) => {
    setSector(e.target.value);
  };

  const onSchemeName = (e) => {
    const value = e.target.value;
    // Regular expression to allow only alphabets and white spaces
    const regex = /^[a-zA-Z0-9\s,\/\-]*$/;
    if (regex.test(value)) {
      setSchemeName(value);
      setIsValidSchemeName(true);
    } else {
      setIsValidSchemeName(false);
      // toast.error("Please use only Alphabet characters")
    }
  };

  const handleKeyDown = (event) => {
    // Allow only alphabets and white spaces
    if (
      !(
        (event.keyCode >= 65 && event.keyCode <= 90) || // A-Z
        (event.keyCode >= 97 && event.keyCode <= 122) || // a-z
        event.keyCode === 32 ||
        event.key === "Backspace"
      )
    ) {
      event.preventDefault();
    }
  };

  const onLocation = (e) => {
    setLocation(e.target.value);
  };

  const onDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const onStatus = (e) => {
    setStatus(e.target.value);
  };

  const onProjectCost = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setProjectCost(value);
    }
  };

  const onTotalWages = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setTotalWages(value);
    }
  };

  const onPersondaysWork = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value) || value === "") {
      setPersondaysWork(value);
    }
  };

  const onUnskilled = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value) || value === "") {
      setUnskilled(value);
    }
  };

  const onSemiskilled = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value) || value === "") {
      setSemiskilled(value);
    }
  };

  const onSkilled = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value) || value === "") {
      setSkilled(value);
    }
  };

  const onWorkOrderNumber = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === "") {
      setWorkOrderNumber(value);
      setAllData({ ...allData, workorderNo: event.target.value });
      setIsValidWorkOrderNumber(true);
    } else {
      setIsValidWorkOrderNumber(false);
    }
  };

  const onContractor = (e) => {
    setContractor(e.target.value);
  };

  const onRemarks = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === "") {
      setRemark(value);
      setIsValidRemark(true);
    } else {
      setIsValidRemark(false);
    }
  };

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

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

  console.log(
    format(new Date(tentativeWorkStartDate), "yyyy-MM-dd"),
    "fatafatafa"
  );
  const onSubmit = () => {
    console.log("clicked");
    if (area === "") {
      toast.error("Please Select Area Type");
    } else if (!district) {
      toast.error("Please Select District");
    }
    //  else if (area === "U" && municipality === "") {
    //   toast.error("Please Select Municipality");
    // } else if (area === "R" && block === "") {
    //   toast.error("Please Select Block");
    // } else if (area === "R" && gp === "") {
    //   toast.error("Please Select Gram Panchayat");
    // }
    else if (sector === "") {
      toast.error("Please Select Scheme Sector");
    } else if (schemeName === "") {
      toast.error("Please Type Scheme Name");
    } else if (Location === "") {
      toast.error("Please Type Worksite Location");
    } else if (department === "") {
      toast.error("Please Select Funding Department");
    } else if (status === "") {
      toast.error("Please Select Status Of Work");
    } else if (!tentativeWorkStartDate) {
      toast.error("Please Select Tentative Work Start Date");
    } else if (!tentativeWorkStartDate) {
      toast.error("Please Select Actual Work Start Date");
    } else if (!expectedWorkDate) {
      toast.error("Please Select Expected Work Completion Date");
    } else if (projectCost === "") {
      toast.error("Please Type Project Cost");
    } else if (totalWages === "") {
      toast.error("Please Type Total Wage Cost involved in the Work");
    } else if (parseInt(totalWages) > parseInt(projectCost)) {
      toast.error("Total Wage Cost cant greater than Project Cost ");
    } else if (persondaysWork === "") {
      toast.error("Please Type Persondays to be generated from the Work");
    }
    // else if (unskilled === "") {
    //   toast.error("Please Type No of Unskilled Workers to be engaged");
    // } else if (semiskilled === "") {
    //   toast.error("Please Type No of Semi-Skilled Workers to be engaged");
    // } else if (skilled === "") {
    //   toast.error("Please Type No of Skilled Workers to be engaged");
    // }
    // else if (workOrderNumber === "") {
    //   toast.error("Please Type Work Order Number");
    // } else if (!workOrderDate) {
    //   toast.error("Please Select Work Order Date");
    // } else if (contractor === "") {
    //   toast.error("Please Select Contractor List");
    // }
    // else if (remark === "") {
    //   toast.error("Please Type Remarks");
    // }
    else {
      addCreateScheme(
        area,
        data?.departmentNo,
        district,
        municipality,
        block,
        gp,
        "0",
        Location,
        sector,
        "-",
        schemeName,
        department,
        allDepartmentList.find((c) => c.departmentNo == department)
          ?.departmentName,

        data?.departmentNo,

        allDepartmentList.find((c) => c.departmentNo === data?.departmentNo)
          ?.departmentName,

        data?.departmentNo,

        allDepartmentList.find((c) => c.departmentNo === data?.departmentNo)
          ?.departmentName,

        status,

        format(new Date(tentativeWorkStartDate), "yyyy-MM-dd"),
        format(new Date(tentativeWorkStartDate), "yyyy-MM-dd"),
        format(new Date(expectedWorkDate), "yyyy-MM-dd"),
        projectCost,
        totalWages,
        0,
        persondaysWork,
        +unskilled,
        +semiskilled,
        +skilled,
        workOrderNumber,
        format(new Date(workOrderDate), "yyyy-MM-dd"),
        contractor,
        "A",
        currentMonth,
        currentYear,
        financialYear,
        remark,
        data?.userIndex,
        (r) => {
          console.log(r, "response");
          if (r.errorCode == 0) {
            setOpenModal(true);
            setSchemeId(r.schemeid);
          } else {
            toast.error(r.message);
          }
        }
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={`Scheme Id ${schemeId} created Successfully`}
        // resetData={resetData}
        to="scheme-list"
        isSuccess={true}
        // isSuccess={true}
        // userCreate={false}
      />
      <div className="flex-grow">
        <div className="mx-auto mt-2">
          <div className="bg-white rounded-lg p-12">
            <div className="shadow-md" style={{ marginBottom: "-1rem" }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <nav aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4 px-4 py-2">
                      {/* Added padding */}
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
                      <li
                        className="text-gray-500 font-bold"
                        aria-current="page"
                      >
                        Scheme Edit
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <br />
            </div>

            <br></br>

            <div className="">
              <div className=" mb-12 mx-2 flex-col rounded-xl shadow-md">
                <div>
                  <div className="div-even ">
                    <div className="label-style w-[30%]">
                      Scheme Id and Name
                    </div>
                    {schemeDetails?.schemeId} &nbsp;{schemeDetails?.schemeName}
                  </div>
                </div>
                <div className="div-odd">
                  <div className="label-style w-[30%]">Department</div>
                  <div className="text">{schemeDetails?.FundingDeptname}</div>
                </div>
                <div className="div-even">
                  <div className="label-style w-[30%]">Funding Department</div>
                  <div className="text">{schemeDetails?.FundingDeptname}</div>
                </div>
                <div className="div-odd">
                  <div className="label-style w-[30%]">
                    Executing Department
                  </div>
                  <div className="text">{schemeDetails?.ExecutingDeptName}</div>
                </div>
                <div className="flex w-full">
                  <div className="w-1/2 flex flex-col rounded-l-xl">
                    <div className="div-even">
                      <div className="label-style">Total Wages Cost</div>
                      {schemeDetails?.totalwagescostinvoled}
                    </div>

                    <div className="div-odd">
                      <div className="label-style">Total Unskilled Workers</div>
                      {schemeDetails?.totalUnskilledWorkers}
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col rounded-r-xl">
                    <div className="div-even">
                      <div className="label-style">Total Project Cost</div>
                      {schemeDetails?.totalprojectCost}
                    </div>
                    <div className="div-odd">
                      <div className="label-style">
                        Person Days Generated Provided
                      </div>
                      {schemeDetails?.personDaysGeneratedprovided}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-12">
              {/* <div className="flex w-full space-x-4 mb-6">
                                <div className="px-4">
                                    <label
                                        htmlFor="scheme_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Area Type
                                        <span className="text-red-500 "> * </span>
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
                                            Select Area
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
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        onChange={onDistrict}
                                    >
                                        <option value="" selected hidden>
                                            Select District List
                                        </option>
                                        {districtListDropdown}

                               
                                    </select>
                                </div>
                                {district?.length > 0 && area === "U" ? (
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
                                            <option value="" selected hidden>
                                                Select Municipality List
                                            </option>
                                            {municipalityListDropdown}

                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {district?.length > 0 && area === "R" ? (
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

                                        
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {block?.length > 0 && area === "R" ? (
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
                                            onClick={onGP}
                                        >
                                            <option value="" selected hidden>
                                                Select GP List
                                            </option>
                                            {GpListDropdown}

                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="flex flex-col w-full mb-4">
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
                                        Scheme Name
                                        <span className="text-red-500 "> * </span>
                                    </label>
                                    <input
                                        id="scheme_name"
                                        name="scheme_name"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Scheme Name..."
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        required
                                        onChange={onSchemeName}
                                    // onKeyDown={handleKeyDown}
                                    />
                                    {!isValidSchemeName && (
                                        <div style={{ color: "red" }}>
                                            Please enter a valid Scheme Name
                                        </div>
                                    )}
                                </div>

                                <div className="px-4">
                                    <label
                                        htmlFor="scheme_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Worksite Location (Full Address)
                                        <span className="text-red-500 "> * </span>
                                    </label>
                                    <input
                                        id="scheme_name"
                                        name="scheme_name"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Worksite Location ..."
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        onChange={onLocation}
                                    />
                                </div>
                                <div className="px-4">
                                    <label
                                        htmlFor="scheme_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Funding Department
                                        <span className="text-red-500 "> * </span>
                                    </label>
                                    <select
                                        id="scheme_name"
                                        name="scheme_name"
                                        autoComplete="off"
                                        onChange={onDepartment}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    >
                                        <option value="" selected hidden>
                                            Select a Department
                                        </option>
                                        {departmentListDropdown}
                                    </select>
                                </div>
                            </div> */}
              <div className="flex w-full space-x-4 mb-6 px-4 ">
                <div className="w-1/4 flex flex-col">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status of Work
                    <span className="text-red-500 ">*</span>
                  </label>
                  <select
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="p-2 block w-full border border-gray-300 rounded-md mt-1"
                    required
                    onChange={onStatus}
                  >
                    <option value="" selected hidden>
                      {status
                        ? status
                        : allData?.StatusOfWork === "P"
                        ? "Proposed"
                        : "Started"}
                    </option>
                    <option value="P">Proposed</option>
                    <option value="S">Started</option>

                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="w-1/4 flex flex-col">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tentative Work Start Date
                    {/* <span className="text-red-500 "> * </span> */}
                  </label>
                  <DatePicker
                    disabled={status == "" || status == "S"}
                    dateFormat="dd/MM/yyyy"
                    className="disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-600/80 w-full border border-gray-300 rounded-md mt-1"
                    selected={tentativeWorkStartDate}
                    onChange={(date) => setTentativeWorkStartDate(date)}
                  />
                </div>

                <div className="w-1/4 flex flex-col">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Actual Work Start Date
                    {/* <span className="text-red-500 "> * </span> */}
                  </label>
                  <DatePicker
                    disabled={status == "" || status == "P"}
                    dateFormat="dd/MM/yyyy"
                    className="disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-600/80 w-full border border-gray-300 rounded-md mt-1"
                    selected={tentativeWorkStartDate}
                    onChange={(date) => setTentativeWorkStartDate(date)}
                  />
                </div>
                <div className="w-fit flex flex-col">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700 w-fit"
                  >
                    Expected Work Completion Date
                    {/* <span className="text-red-500 "> * </span> */}
                  </label>
                  <DatePicker
                    minDate={tentativeWorkStartDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd-mm-yyyy"
                    className="w-full border border-gray-300 rounded-md mt-1"
                    selected={expectedWorkDate}
                    onChange={(date) => setExpectedWorkDate(date)}
                  />
                </div>
              </div>
              {/* <div className="flex w-full mb-4 space-x-4">
                                <div className="px-4 w-1/5">
                                    <label
                                        htmlFor="scheme_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Project Cost (in Rs.)
                                        <span className="text-red-500 "> * </span>
                                    </label>
                                    <input
                                        id="scheme_name"
                                        name="scheme_name"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Project Cost..."
                                        value={projectCost}
                                        onChange={onProjectCost}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="px-4 w-1/5">
                                    <label
                                        htmlFor="scheme_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Total Wage Cost
                                        <span className="text-red-500 "> *</span>
                                    </label>
                                    <input
                                        id="scheme_name"
                                        name="scheme_name"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Total Wage Cost involved in the Work..."
                                        value={totalWages}
                                        onChange={onTotalWages}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="px-4 w-1/4">
                                    <label
                                        htmlFor="scheme_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Persondays to be generated
                                        <span className="text-red-500 w-fit"> * </span>
                                    </label>
                                    <input
                                        id="scheme_name"
                                        name="Persondays"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Persondays to be generated from the Work..."
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        value={persondaysWork}
                                        onChange={onPersondaysWork}
                                    />
                                </div>
                                <div className="px-4 w-1/3">
                                    <label
                                        htmlFor="scheme_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        No of Unskilled Workers to be engaged
                                        <span className="text-red-500 "> * </span>
                                    </label>
                                    <input
                                        id="scheme_name"
                                        name="scheme_name"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="No of Unskilled Workers to be  engaged..."
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        value={unskilled}
                                        onChange={onUnskilled}
                                    />
                                </div>
                            </div> */}
              <div className="flex w-full space-x-4 mb-4 ">
                {/* <div className="px-4 w-1/3">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Semi-Skilled Workers to be engaged
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="No of Semi-Skilled Workers to be  engaged..."
                  value={semiskilled}
                  onChange={onSemiskilled}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div> */}
                {/* <div className="px-4 w-1/3">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Skilled Workers to be engaged
              
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="No of Skilled Workers to be  engaged..."
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={skilled}
                  onChange={onSkilled}
                />
              </div> */}
              </div>
              <div className="flex w-full space-x-4 mb-4 ">
                <div className="px-4 w-1/3">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Order Number
                    {/* <span className="text-red-500 "> * </span> */}
                  </label>
                  <input
                    id="scheme_name"
                    name="workorderNo"
                    type="text"
                    autoComplete="off"
                    placeholder="Work Order Number..."
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onWorkOrderNumber}
                    value={allData?.workorderNo}
                  />
                  {!isValidWorkOrderNumber && (
                    <div style={{ color: "red" }}>
                      Please enter a Valid Work Order Number
                    </div>
                  )}
                </div>
                <div className="px-4 w-1/3 flex flex-col">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Order Date
                    {/* <span className="text-red-500 "> * </span> */}
                  </label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    className="w-full border border-gray-300 rounded-md mt-1"
                    selected={workOrderDate}
                    onChange={(date) => setWorkOrderDate(date)}
                  />
                </div>
                <div className="px-4 w-1/3">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contractor List
                    {/* <span className="text-red-500 "> * </span> */}
                  </label>
                  <select
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onContractor}
                  >
                    <option value="" selected hidden>
                      {contractor ? contractor : allData?.c}
                    </option>
                    {/* <option value="1">
                    Department Itself
                  </option> */}
                    {contractorListDropdown}

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
                    Remarks
                  </label>
                  <input
                    id="scheme_name"
                    name="scheme_name"
                    type="text"
                    autoComplete="off"
                    placeholder=" Remarks..."
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onRemarks}
                  />
                  {!isValidRemark && (
                    <div style={{ color: "red" }}>
                      Please enter a Valid Remark
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchemeEdit;
