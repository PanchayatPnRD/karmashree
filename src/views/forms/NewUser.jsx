import React, { useState, useEffect } from "react";
import {
  addNewUser,
  getAllDesignationList,
  getAllDepartmentList,
  getAllDistrictList,
  getAllRoleList,
  getAllSubDivisionList,
  getAllBlockList,
  getAllPedastalList,
  getAllBlockListbySub,
} from "../../Service/NewUserService";
import {
  getAllMunicipalityList,
  getAllGramPanchayatList,
} from "../../Service/ActionPlan/ActionPlanService";
import { Button, Modal } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";
import ColorRingCustomLoader from "../Loader/Loader";
import BreadCrumb from "../../components/BreadCrumb";

const NewUser = () => {
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(errorMessage, "erroreeeororor");
  const [openModal, setOpenModal] = useState();
  const [department, setDepartment] = useState("");
  const [allDepartmentList, setAllDepartmentList] = useState([]);
  const [district, setDistrict] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  // const [userId, setUserId] = useState("");
  // const [password, setPassword] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [nodalOfficerName, setNodalOfficerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [allRoleList, setAllRoleList] = useState([]);
  const [allSubDivisionList, setAllSubDivisionList] = useState([]);
  const [allPedastralList, setAllPedastralList] = useState([]);
  const [allBlockList, setAllBlockList] = useState([]);
  const [allAreaBlockList, setAllAreaBlockList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState("");
  const [userData, setUserData] = useState(null);
  const [subDivision, setSubDivision] = useState("");
  const [block, setBlock] = useState("");
  const [areaBlock, setAreaBlock] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [role, setRole] = useState("");
  console.log(role, "rolerole");
  const [allDesignationList, setAllDesignationList] = useState([]);
  const [designation, setDesignation] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [technicalOfficerName, setTechnicalOfficerName] = useState("");
  const [technicalOfficerDesignation, setTechnicalOfficerDesignation] =
    useState("");
  const [technicalOfficerContactNumber, setTechnicalOfficerContactNumber] =
    useState("");
  const [technicalOfficerEmail, setTechnicalOfficerEmail] = useState("");
  const [technicalOfficerEmailInput, setTechnicalOfficerEmailInput] =
    useState("");
  const [area, setArea] = useState("");
  const [allGpList, setAllGpList] = useState([]);
  const [areaGp, setAreaGP] = useState("");
  const [pedastal, setAllPedastalList] = useState([]);
  const [parastatals, setParastatals] = useState();
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidTechnicalMobile, setIsValidTechnicalMobile] = useState(true);

  console.log(pedastal, "pedastal");
  useEffect(() => {
    const jsonString = sessionStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);
    // console.log("userData",userData?.districtcode, userData?.subDivision)
    getAllDepartmentList(data?.departmentNo).then(function (result) {
      const response = result?.data?.result;
      setAllDepartmentList(response);
    });

    getAllMunicipalityList(data?.districtcode, data?.municipalityCode).then(
      function (result) {
        const response = result?.data?.result;
        setAllMunicipalityList(response);
      }
    );
    //Pedastal list
    getAllPedastalList(data?.departmentNo, data?.deptWing).then(function (
      result
    ) {
      const response = result?.data?.result;
      setAllPedastralList(response);
    });

    getAllDesignationList(data?.category).then(function (result) {
      const response = result?.data?.result;
      console.log(response, "sibamdey");
      setAllDesignationList(response?.result);
    });
    getAllDistrictList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });
    getAllSubDivisionList(data?.districtcode, data?.subDivision).then(function (
      result
    ) {
      const response = result?.data?.result;
      setAllSubDivisionList(response);
    });

    {
      data?.category === "SUB"
        ? ""
        : getAllBlockList(data?.districtcode, data?.blockCode).then(function (
            result
          ) {
            const response = result?.data?.result;
            setAllBlockList(response);
          });
    }

    {
      data?.category === "BLOCK"
        ? ""
        : getAllBlockListbySub(data?.districtcode, data?.subDivision).then(
            function (result) {
              const response = result?.data?.result;
              setAllBlockList(response);
            }
          );
    }

    getRoleDataList();
  }, []);
  console.log(allDistrictList, "allDistrictList");

  //Designation list
  let designationListDropdown = <option>No data found...</option>;
  if (allDesignationList && allDesignationList.length > 0) {
    designationListDropdown = allDesignationList.map((desgRow, index) => (
      <option value={desgRow.designationId}>{desgRow.designation}</option>
    ));
  }

  //Department list
  let departmentListDropdown = <option>No data found...</option>;
  if (allDepartmentList && allDepartmentList.length > 0) {
    departmentListDropdown = allDepartmentList.map((deptRow, index) => (
      <option value={deptRow.departmentNo}>{deptRow.departmentName}</option>
    ));
  }

  //District list

  let districtListDropdown = <option>No data found...</option>;
  if (allDistrictList && allDistrictList?.length > 0) {
    districtListDropdown = allDistrictList?.map((distRow, index) => (
      <option value={distRow?.districtCode}>{distRow?.districtName}</option>
    ));
  }

  //Role list
  async function getRoleDataList() {
    getAllRoleList().then(function (result) {
      const response = result?.data?.result;
      setAllRoleList(response);
    });
  }

  let roleListDropdown = <option>No data found...</option>;
  if (allRoleList && allRoleList.length > 0) {
    roleListDropdown = allRoleList.map((roleRow, index) => (
      <option value={roleRow.id}>{roleRow.role_type}</option>
    ));
  }

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

  const onDistrict = (e) => {
    console.log(e.target.value, "district");
    setDistrict(e.target.value);
    getAllSubDivisionList(
      userData?.districtcode ? userData?.districtcode : e.target.value,
      userData?.subDivision
    ).then(function (result) {
      const response = result?.data?.result;
      setAllSubDivisionList(response);
    });

    // getAllBlockList(e.target.value, userData?.blockCode).then(function (
    //   result
    // ) {
    //   const response = result?.data?.result;
    //   setAllBlockList(response);
    // });
    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllAreaBlockList(response);
    });

    getAllMunicipalityList(e.target.value, userData?.municipalityCode).then(
      function (result) {
        const response = result?.data?.result;
        setAllMunicipalityList(response);
      }
    );
  };

  let pedastralDropdown = <option>No data found...</option>;
  if (allPedastralList && allPedastralList.length > 0) {
    pedastralDropdown = allPedastralList.map((peddivRow, index) => (
      <option value={peddivRow.id}>{peddivRow.pedestalName}</option>
    ));
  }

  let subDivisionDropdown = <option>No data found...</option>;
  if (allSubDivisionList && allSubDivisionList.length > 0) {
    subDivisionDropdown = allSubDivisionList.map((subdivRow, index) => (
      <option value={subdivRow.subdivCode}>{subdivRow.subdivName}</option>
    ));
  }
  let blockDropdown = <option>No data found...</option>;
  if (allBlockList && allBlockList.length > 0) {
    blockDropdown = allBlockList.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.blockName}</option>
    ));
  }
  let blockListDropdown = <option>No data found...</option>;
  if (allAreaBlockList && allAreaBlockList.length > 0) {
    blockListDropdown = allAreaBlockList.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.blockName}</option>
    ));
  }

  let municipalityListDropdown = <option>No data found...</option>;
  if (allMunicipalityList && allMunicipalityList.length > 0) {
    municipalityListDropdown = allMunicipalityList.map((munRow, index) => (
      <option value={munRow.urbanCode}>{munRow.urbanName}</option>
    ));
  }
  const onAreaBlock = (e) => {
    setAreaBlock(e.target.value);
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  };

  let GpListDropdown = <option>No data found...</option>;
  if (allGpList && allGpList.length > 0) {
    GpListDropdown = allGpList.map((gpRow, index) => (
      <option value={gpRow.gpCode}>{gpRow.gpName}</option>
    ));
  }

  const onOfficeName = (e) => {
    setOfficeName(e.target.value);
  };

  const onNodalOfficerName = (e) => {
    setNodalOfficerName(e.target.value);
  };

  const onContactNumber = (e) => {
    const value = e.target.value;
    const regex = /^[6-9]{1}[0-9]{9}$/;
    if (regex.test(value) || value === "") {
      setContactNumber(value);
      setIsValidMobile(true);
    } else {
      setIsValidMobile(false);
    }
  };

  const onEmail = (e) => {
    setEmailInput(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(emailRegex.test(e.target.value));
  };

  const onUserAddress = (e) => {
    setUserAddress(e.target.value);
  };

  const onSubDivision = (e) => {
    setSubDivision(e.target.value);
    {
      userData?.category === "BLOCK"
        ? ""
        : getAllBlockListbySub(userData?.districtcode, e.target.value).then(
            function (result) {
              const response = result?.data?.result;
              setAllBlockList(response);
            }
          );
    }
  };

  const onBlock = (e) => {
    setBlock(e.target.value);
  };

  const onRole = (e) => {
    setRole(e.target.value);
  };

  const onDesignation = (e) => {
    setDesignation(e.target.value);
  };

  const onAddTechnicalOfficer = (e) => {
    setIsChecked(!isChecked);
  };

  const onTechnicalOfficerName = (e) => {
    setTechnicalOfficerName(e.target.value);
  };

  const onTechnicalOfficerDesignation = (e) => {
    setTechnicalOfficerDesignation(e.target.value);
  };

  const onTechnicalOfficerContactNumber = (e) => {
    const value = e.target.value;
    const regex = /^[6-9]{1}[0-9]{9}$/;
    if (regex.test(value) || value === "") {
      setTechnicalOfficerContactNumber(value);
      setIsValidTechnicalMobile(true);
    } else {
      setIsValidTechnicalMobile(false);
    }
  };

  const onTechnicalOfficerEmail = (e) => {
    setTechnicalOfficerEmailInput(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setTechnicalOfficerEmail(emailRegex.test(e.target.value));
  };

  const onRegister = () => {
    if (userData?.category === "HQ" && department === "") {
      toast.error("Please select a department");
    } else if (
      !userData?.category === "HQ" ||
      (userData?.category === "HD" && district === "")
      // (userData?.category === "DEPT" && district === "")
      // (userData?.category === "DIST" && district === "") ||
      // (userData?.category === "SUB" && district === "") ||
      // (userData?.category === "BLOCK" && district === "")
    ) {
      toast.error("Please select a district");
    }
    // else if (

    //   (userData?.category === "HQ" && !parastatals)
    // (userData?.category === "DEPT" && district === "")
    // (userData?.category === "DIST" && district === "") ||
    // (userData?.category === "SUB" && district === "") ||
    // (userData?.category === "BLOCK" && district === "")
    // ) {
    //   toast.error("Please select a Parastatals");
    // }
    else if (
      !userData?.category === "HQ"
      // (userData?.category === "DIST" && subDivision === "")
      // (userData?.category === "SUB" && subDivision === "") ||
      // (userData?.category === "BLOCK" && subDivision === "")
    ) {
      toast.error("Please select a sub division");
    } else if (
      (!userData?.category === "HQ" && block === "") ||
      (userData?.category === "SUB" && block === "")
      // (userData?.category === "BLOCK" && block === "")
    ) {
      toast.error("Please select a block");
    } else if (nodalOfficerName === "") {
      toast.error("Please type your nodal officer name");
    } else if (designation === "") {
      toast.error("Please select Nodal officer designation");
    } else if (contactNumber.length != 10) {
      toast.error("Please type 10 digit Nodal officer mobile number");
    } else if (!email) {
      toast.error("Please enter Nodal officer valid email id");
    } else if (!userData?.category === "HQ" && officeName === "") {
      toast.error("Please type your office name");
    } else if (role === "") {
      toast.error("Please select role");
    } else if (userAddress === "") {
      toast.error("Please type user address");
    } else if (
      technicalOfficerContactNumber != "" &&
      technicalOfficerContactNumber.length != 10
    ) {
      toast.error("Please type 10 digit Technical officer mobile number");
    } else if (technicalOfficerEmailInput != "" && !technicalOfficerEmail) {
      toast.error("Please enter Technical officer valid email id");
    } else {
      setLoader(true);

      addNewUser(
        userData?.category === "HQ"
          ? department
          : allDepartmentList[0]?.departmentNo,

        userData?.category === "HD"
          ? district
          : userData?.districtcode
          ? userData?.districtcode
          : district,

        userData?.category === "DIST"
          ? subDivision
          : userData?.subDivision
          ? userData?.subDivision
          : subDivision,

        userData?.category === "SUB" || userData?.category === "DIST"
          ? block
          : userData?.blockCode
          ? userData?.blockCode
          : block,

        officeName,
        nodalOfficerName,
        contactNumber,
        emailInput,
        designation,
        userAddress,
        role,
        userData?.category === "HQ"
          ? "HD"
          : userData?.category === "HD"
          ? "DIST"
          : userData?.category === "DEPT"
          ? "DIST"
          : userData?.category === "DIST" && subDivision === "" && block === ""
          ? "DIST"
          : userData?.category === "DIST" && subDivision && block === ""
          ? "SUB"
          : (userData?.category === "DIST" && subDivision && block) ||
            (userData?.category === "DIST" && subDivision === "" && block)
          ? "BLOCK"
          : userData?.category === "SUB"
          ? "BLOCK"
          : "BLOCK",

        parastatals ? parastatals : userData?.deptWing,
        "A",
        area,
        areaGp,
        municipality,
        role,
        role,
        "",
        userData?.userIndex,
        userData?.userIndex,
        technicalOfficerName ? technicalOfficerName : "",
        technicalOfficerDesignation ? technicalOfficerDesignation : "",
        technicalOfficerContactNumber ? technicalOfficerContactNumber : "",
        technicalOfficerEmailInput ? technicalOfficerEmailInput : "",
        (r) => {
          console.log(r, "sibamdeyresponse");
          if (r.errorCode == 0) {
            setErrorMessage(r);
            setOpenModal(true);
            setLoader(false);

            // setErrorMessage(r.message)
            // toast.success(r.message);
          } else {
            // setErrorMessage(r.message)
            toast.error(r.message);
            setLoader(false);
          }
        }
      );
    }
  };

  const onArea = (e) => {
    setArea(e.target.value);
  };
  const onGP = (e) => {
    setAreaGP(e.target.value);
  };
  const onMunicipality = (e) => {
    console.log(e.target.value, "municipality");
    setMunicipality(e.target.value);
  };

  useEffect(() => {
    if (userData?.category == "HQ") setRole("1");
  }, [userData]);

  return (
    <>
      <div className="flex-grow ">
        <SuccessModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          message={errorMessage?.message}
          isSuccess={errorMessage?.errorCode === 0 ? true : false}
          to="dept-userlist"
          // isSuccess={true}
        />
        <ToastContainer />
        <div className="mx-auto">
          
          <BreadCrumb page={"User Registration"} className={"px-12"}/>
          <form className="flex">
            <div className="w-full px-12 space-y-6 pb-10">
              <div className="flex items-center space-x-6">
                <div className="w-1/2">
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

                <div className="w-1/2">
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
                      {userData?.category === "HQ"
                        ? "Select a Parastatals"
                        : pedastralDropdown}
                    </option>
                    {userData?.category === "HQ" ? pedastralDropdown : ""}
                  </select>
                </div>
              </div>
              {userData?.category === "HQ" ||
              userData?.category === "DIST" ||
              userData?.category === "DEPT" ||
              userData?.category === "SUB" ||
              userData?.category === "BLOCK" ? (
                ""
              ) : (
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Area
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    onChange={onArea}
                    className="mt-1 p-2 w-full block border border-gray-300 rounded-md"
                  >
                    <option value="" selected>
                      Select a area
                    </option>
                    <option value="R">Rural</option>
                    <option value="U">Urban</option>
                  </select>
                </div>
              )}
              <div className="flex space-x-4">
                {userData?.category === "HQ" ? (
                  ""
                ) : (
                  <div className="w-1/4">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      District
                      <span className="text-red-500 "> * </span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      onChange={onDistrict}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    >
                      <option value="" selected hidden>
                        {userData?.category === "DEPT" ||
                        userData?.category === "DIST" ||
                        userData?.category === "SUB" ||
                        userData?.category === "BLOCK"
                          ? districtListDropdown
                          : "Select a District"}
                      </option>
                      {districtListDropdown}
                    </select>
                  </div>
                )}
                {(userData?.category === "HD" && district && area === "U") ||
                (userData?.category === "DIST" && district && area === "U") ? (
                  <div className="w-1/4">
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
                      <option value="">Select Municipality List</option>
                      <option value="" selected hidden>
                        {userData?.category === "DEPT" ||
                        userData?.category === "DIST" ||
                        userData?.category === "SUB" ||
                        userData?.category === "BLOCK"
                          ? municipalityListDropdown
                          : "Select a Municipality"}
                      </option>
                      {municipalityListDropdown}
                    </select>
                  </div>
                ) : (
                  ""
                )}
                {userData?.category === "HQ" ||
                userData?.category === "HD" ||
                userData?.category === "DEPT" ||
                (userData?.category === "BLOCK" &&
                  userData?.subDivision === "") ? (
                  ""
                ) : (
                  <div className="w-1/4">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sub-Division
                      {/* <span className="text-red-500 "> * </span> */}
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      onChange={onSubDivision}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    >
                      {userData?.category === "DIST" ? (
                        <option value="0">Select a sub-division</option>
                      ) : (
                        ""
                      )}
                      <option value="" selected hidden>
                        {userData?.category === "SUB" ||
                        userData?.category === "BLOCK"
                          ? subDivisionDropdown
                          : "Select a sub-division"}
                      </option>
                      {subDivisionDropdown}
                    </select>
                  </div>
                )}
                {userData?.category === "HQ" ||
                userData?.category === "HD" ||
                userData?.category === "DEPT" ? (
                  ""
                ) : (
                  <div className="w-1/4">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Block
                      {/* <span className="text-red-500 "> * </span> */}
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      onChange={onBlock}
                    >
                      {userData?.category === "DIST" ? (
                        <option value="0">Select a Block</option>
                      ) : (
                        ""
                      )}
                      <option value="" selected hidden>
                        {userData?.category === "BLOCK"
                          ? blockDropdown
                          : "Select a block"}
                      </option>
                      {blockDropdown}
                    </select>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-1/2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nodal Officer Name
                    <span className="text-red-500 "> * </span>
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    onChange={onNodalOfficerName}
                    placeholder="type your Nodal officer name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    nodal officer Designation
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    onChange={onDesignation}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  >
                    <option value="" selected hidden>
                      Select a Designation
                    </option>
                    {designationListDropdown}
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-1/3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    nodal officer mobile number
                    <span className="text-red-500 "> * </span>
                  </label>
                  <input
                    id="tel"
                    name="username"
                    maxLength={10}
                    type="text"
                    // value={contactNumber}
                    autoComplete="username"
                    onChange={onContactNumber}
                    placeholder="type your Contact number"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {!isValidMobile && (
                    <div style={{ color: "red" }}>
                      Please enter a valid Mobile Number
                    </div>
                  )}
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    nodal officer email address
                    <span className="text-red-500 "> * </span>
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    onChange={onEmail}
                    placeholder="type your email id"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    name="role"
                    onChange={onRole}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  >
                    <option value="" selected hidden>
                      Select a role
                    </option>
                    <option value="1" selected={userData?.category == "HQ"}>
                      Admin
                    </option>
                    <option hidden={userData?.category == "HQ"} value="2">
                      Operator
                    </option>
                    <option hidden={userData?.category == "HQ"} value="3">
                      Project Implementing Agency(PIA)
                    </option>
                  </select>
                </div>
              </div>
              {userData?.category === "HQ" ||
              userData?.category === "HD" ||
              userData?.category === "DEPT" ||
              userData?.category === "DIST" ||
              userData?.category === "SUB" ||
              userData?.category === "BLOCK" ? (
                ""
              ) : (
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GP
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    // onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  >
                    <option value="" selected hidden>
                      Select a gp
                    </option>
                    <option value="rural">Rural</option>
                    <option value="urban">Urban</option>
                  </select>
                </div>
              )}
              {userData?.category === "HQ" ||
              userData?.category === "HD" ||
              userData?.category === "DEPT" ||
              userData?.category === "DIST" ||
              userData?.category === "SUB" ||
              userData?.category === "BLOCK" ? (
                ""
              ) : (
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Area
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    // onChange={handleChange}
                    className="mt-1 p-2 w-full block border border-gray-300 rounded-md"
                  >
                    <option value="" selected hidden>
                      Select a area
                    </option>
                    <option value="rural">Rural</option>
                    <option value="urban">Urban</option>
                  </select>
                </div>
              )}

              {userData?.category !== "HQ" && (
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Office Name
                    <span className="text-red-500 "> * </span>
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    onChange={onOfficeName}
                    placeholder="type your office name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Office Address
                  <span className="text-red-500 "> * </span>
                </label>
                <textarea
                  id="username"
                  name="username"
                  type="textArea"
                  autoComplete="username"
                  onChange={onUserAddress}
                  placeholder="type your office address"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              {/* <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Id
              </label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                onChange={onUserId}
                placeholder="type your User Id"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={onPassword}
                placeholder="type your Password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div> */}
              <div className="flex space-x-4 items-center">
                <input
                  id="technicalOfficer"
                  type="checkbox"
                  checked={isChecked}
                  onChange={onAddTechnicalOfficer}
                />
                <label htmlFor="technicalOfficer" className="font-bold">
                  Add Technical Officer
                </label>
              </div>
              {isChecked ? (
                <>
                  <div className="flex items-center space-x-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Technical Officer Name
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onChange={onTechnicalOfficerName}
                        placeholder="type Technical officer name"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 capitalize"
                      >
                        Technical officer Designation
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onChange={onTechnicalOfficerDesignation}
                        placeholder="Type Technical officer Designation"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 capitalize"
                      >
                        Technical officer mobile number
                      </label>
                      <input
                        id="tel"
                        name="username"
                        type="text"
                        maxLength={10}
                        // value={technicalOfficerContactNumber}
                        autoComplete="username"
                        onChange={onTechnicalOfficerContactNumber}
                        placeholder="type your Contact number"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      />
                      {!isValidTechnicalMobile && (
                        <div style={{ color: "red" }}>
                          Please enter a valid Mobile Number
                        </div>
                      )}
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 capitalize"
                      >
                        Technical officer email address
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onChange={onTechnicalOfficerEmail}
                        placeholder="type your email id"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onRegister}
                  disabled={loader}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUser;
