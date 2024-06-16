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
  updateScheme,
  getSchemeViewDetails,
} from "../../Service/Scheme/SchemeService";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";
import { useParams } from "react-router-dom";
import { Table } from "flowbite-react";

const SchemeView = () => {
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
  const [schemecontractorDetails, setSchemecontractorDetails] = useState([]);
  const [allData, setAllData] = useState({
    workorderNo: "",
    tentativeStartDate: "",
    workOderDate: "",
    ActualtartDate: "",
    ExpectedCompletionDate: "",
    Remarks: "",
  });
  

  
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
      const response = result?.data;
      setAllData(response);
      setSchemeDetails(response?.masterScheme);
      setSchemecontractorDetails(response?.employmentSummary)
    });
  }, []);

  
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
    setAllData({ ...allData, ControctorID: e.target.value });
    setContractor(e.target.value);
  };

  const onRemarks = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === "") {
      setRemark(value);
      setAllData({ ...allData, Remarks: event.target.value });

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
  
  
  

  
    format(new Date(tentativeWorkStartDate), "yyyy-MM-dd"),
    "fatafatafa"
  );
  const onUpdate = () => {

    updateScheme(
      allData?.scheme_sl,
      status ? status : allData?.StatusOfWork,
      format(new Date(allData?.tentativeStartDate), "yyyy-MM-dd"),
      format(new Date(allData?.ActualtartDate), "yyyy-MM-dd"),
      format(new Date(expectedWorkDate ? expectedWorkDate : allData?.ExpectedCompletionDate), "yyyy-MM-dd"),
      allData?.workorderNo,
      format(new Date(workOrderDate ? workOrderDate : allData?.workOderDate), "yyyy-MM-dd"),
      allData?.ControctorID,
      allData?.Remarks,

      (r) => {
        
        if (r.errorCode == 0) {
          setOpenModal(true);
          setSchemeId(r.schemeid);
        } else {
          toast.error(r.message);
        }
      }
    );

  };

  const onTentativeStartDate = (d) => {
    setAllData({ ...allData, tentativeStartDate: format(new Date(d), "yyyy-MM-dd") });
    setTentativeWorkStartDate(d)
  }

  const onActualStartDate = (d) => {

    setAllData({ ...allData, ActualtartDate: format(new Date(d), "yyyy-MM-dd") });
    setTentativeWorkStartDate(d)

  }

  const onExpectedWorkdate = (d) => {
    setAllData({ ...allData, ExpectedCompletionDate: format(new Date(d), "yyyy-MM-dd") });
    setExpectedWorkDate(d)
  }

  const onWorkOrderDate = (d) => {
    setAllData({ ...allData, workOderDate: format(new Date(d), "yyyy-MM-dd") });
    setWorkOrderDate(d)
  }

  return (
    <>
      <ToastContainer />
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={`Scheme updated Successfully`}
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
                        Scheme View
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
                      <div className="label-style">Area Type</div>
                      {schemeDetails?.schemeArea === "R" ? "Rural" : "Urban"}

                    </div>

                    <div className="div-odd">
                      <div className="label-style">Status of Work</div>
                      {schemeDetails?.StatusOfWork === "P" ? "Proposed" : "Started"}

                    </div>

                    <div className="div-even">
                      <div className="label-style">Actual Work Start Date</div>
                      {schemeDetails?.ActualtartDate}

                    </div>
                    <div className="div-odd">
                      <div className="label-style">Sector</div>
                      {allSectorList.find((c) => c.sectorid == schemeDetails?.schemeSector)?.sectorname}

                    </div>
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
                      <div className="label-style">District</div>

                      {allDistrictList.find((c) => c.districtCode == schemeDetails?.districtcode)?.districtName}

                    </div>
                    <div className="div-odd">
                      <div className="label-style">Tentative Work Start Date
                      </div>
                      {schemeDetails?.tentativeStartDate}
                    </div>
                    <div className="div-even">
                      <div className="label-style">Expected Work Completion Date
                      </div>
                      {schemeDetails?.ExpectedCompletionDate ? schemeDetails?.ExpectedCompletionDate : "-"}
                    </div>
                    <div className="div-odd">
                      <div className="label-style">Work Location</div>
                      {schemeDetails?.village}
                    </div>

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
            <div className="overflow-x-auto overflow-y-auto max-h-[300px] w-full show-scrollbar shadow-md">
              <Table>
                <Table.Head className="sticky top-0">
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    #
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Work Jobcard No
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Job Card Holder Name
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Total Days Work Demanded
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Total Days Work Allocated
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Total Days Work Provided
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Total Wages Paid (Cr.)
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Total No Of Mandays
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                    Average Wages
                  </Table.HeadCell>

                </Table.Head>

                <Table.Body>
                  {schemecontractorDetails?.map((d, index) => (
                    <Table.Row>
                      <Table.Cell className="py-1">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {d?.employment_workerJobCardNo}
                      </Table.Cell>
                      <Table.Cell className="py-1">
                        {d?.employment_workerName}
                      </Table.Cell>
                      <Table.Cell className="py-1">
                        {d?.NoOfDaysDemanded==null?"-":d?.NoOfDaysDemanded}
                      </Table.Cell>
                      <Table.Cell className="py-1">
                        {d?.NoOfDaysAllocated==null?"-":d?.NoOfDaysAllocated}
                      </Table.Cell>
                      <Table.Cell className="py-1">
                        {d?.NoOfDaysProvided == null ? "-" : d?.NoOfDaysProvided}
                      </Table.Cell>
                      <Table.Cell className="py-1">
                        {d?.TotalWagesPaid==null?"-":d?.TotalWagesPaid}
                      </Table.Cell>
                      <Table.Cell className="py-1">
                        {d?.MANDAYS==null?"-":d?.MANDAYS}
                      </Table.Cell>
                      <Table.Cell className="py-1">
                        {d?.AVERAGEWAGE==null?"-":d?.AVERAGEWAGE}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchemeView;
