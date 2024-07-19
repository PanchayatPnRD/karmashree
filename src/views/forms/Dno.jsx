import React, { useState, useEffect } from "react";
import {
  getAllDesignationList,
  getAllDepartmentList,
  getAllDistrictList,
  getAllRoleList,
  getAllSubDivisionList,
  getAllBlockList,
  getAllGramPanchayatList,
} from "../../Service/NewUserService";
import { addNewDNO } from "../../Service/DNO/dnoService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";
import classNames from "classnames";
import BreadCrumb from "../../components/BreadCrumb"


const Dno = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState();
  const [department, setDepartment] = useState("");
  const [allDepartmentList, setAllDepartmentList] = useState([]);
  const [district, setDistrict] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [nodalOfficerName, setNodalOfficerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [allRoleList, setAllRoleList] = useState([]);
  const [allSubDivisionList, setAllSubDivisionList] = useState([]);
  const [allBlockList, setAllBlockList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [subDivision, setSubDivision] = useState("");
  const [block, setBlock] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [role, setRole] = useState("");
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
  const [gp, setGp] = useState("");
  const [allGpList, setAllGpList] = useState([]);

  useEffect(() => {
    const jsonString = sessionStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);
    getAllDepartmentList(data?.departmentNo).then(function (result) {
      const response = result?.data?.result;
      setAllDepartmentList(response);
    });
    getAllGramPanchayatList(data?.districtcode, data?.blockCode).then(function (
      result
    ) {
      const response = result?.data?.result;
      setAllGpList(response);
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
    getAllBlockList(data?.districtcode, data?.blockCode).then(function (
      result
    ) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });
    getRoleDataList();
  }, []);
  console.log(allDistrictList, "allDistrictList");

  let GpListDropdown = <option>Loading...</option>;
  if (allGpList && allGpList.length > 0) {
    GpListDropdown = allGpList.map((gpRow, index) => (
      <option value={gpRow.gpCode}>{gpRow.gpName}</option>
    ));
  }

  //Designation list
  let designationListDropdown = <option>Loading...</option>;
  if (allDesignationList && allDesignationList.length > 0) {
    designationListDropdown = allDesignationList.map((desgRow, index) => (
      <option value={desgRow.designationId}>{desgRow.designation}</option>
    ));
  }

  //Department list
  let departmentListDropdown = <option>Loading...</option>;
  if (allDepartmentList && allDepartmentList.length > 0) {
    departmentListDropdown = allDepartmentList.map((deptRow, index) => (
      <option value={deptRow.departmentNo}>{deptRow.departmentName}</option>
    ));
  }

  //District list

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList?.length > 0) {
    districtListDropdown = allDistrictList?.map((distRow, index) => (
      <option value={distRow?.districtCode}>{distRow?.districtName}</option>
    ));
  }

  console.log(districtListDropdown, "districtListDropdown");

  //Role list
  async function getRoleDataList() {
    getAllRoleList().then(function (result) {
      const response = result?.data?.result;
      setAllRoleList(response);
    });
  }

  let roleListDropdown = <option>Loading...</option>;
  if (allRoleList && allRoleList?.length > 0) {
    roleListDropdown = allRoleList?.map((roleRow, index) => (
      <option value={roleRow?.id}>{roleRow?.role_type}</option>
    ));
  }

  const onDepartment = (e) => {
    setDepartment(e.target.value);
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

    getAllBlockList(e.target.value, userData?.blockCode).then(function (
      result
    ) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });
  };

  let subDivisionDropdown = <option>Loading...</option>;
  if (allSubDivisionList && allSubDivisionList.length > 0) {
    subDivisionDropdown = allSubDivisionList.map((subdivRow, index) => (
      <option value={subdivRow.subdivCode}>{subdivRow.subdivName}</option>
    ));
  }
  let blockDropdown = <option>Loading...</option>;
  if (allBlockList && allBlockList.length > 0) {
    blockDropdown = allBlockList.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.blockName}</option>
    ));
  }
  const onUserId = (e) => {
    setUserId(e.target.value);
  };

  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const onOfficeName = (e) => {
    setOfficeName(e.target.value);
  };

  const onNodalOfficerName = (e) => {
    setNodalOfficerName(e.target.value);
  };

  const onContactNumber = (e) => {
    if (e.target.value.length <= 10) {
      setContactNumber(e.target.value);
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
    setTechnicalOfficerContactNumber(e.target.value);
  };

  const onTechnicalOfficerEmail = (e) => {
    setTechnicalOfficerEmail(e.target.value);
  };

  const onRegister = () => {
    // toast.success("DNO Created successfully")
    if (!userData?.category === "HD" && district === "") {
      toast.error("Please select a district");
    } else if (nodalOfficerName === "") {
      toast.error("Please type DNO officer name");
    } else if (designation === "") {
      toast.error("Please select DNO officer designation");
    } else if (contactNumber.length != 10) {
      toast.error("Please type 10 digit DNO officer mobile number");
    } else if (!email) {
      toast.error("Please enter Nodal officer valid email id");
    } else if (userAddress === "") {
      toast.error("Please type office address");
    } else {
      addNewDNO(
        userData?.category === "HQ"
          ? department
          : allDepartmentList[0]?.departmentNo,

        userData?.category === "HQ" ? district : userData?.districtcode,
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
          ? "DIST"
          : userData?.category === "DIST"
          ? "BLOCK"
          : userData?.category === "BLOCK"
          ? "GP"
          : "",
        "",
        "A",
        userData?.category === "HQ" || userData?.category === "DIST"
          ? 0
          : 101211,
        role,
        role,
        "",
        userData?.userIndex,
        userData?.userIndex,
        technicalOfficerName ? technicalOfficerName : "",
        technicalOfficerDesignation ? technicalOfficerDesignation : "",
        technicalOfficerContactNumber ? technicalOfficerContactNumber : "",
        technicalOfficerEmail ? technicalOfficerEmail : "",
        (r) => {
          setErrorMessage(r);
          setOpenModal(true);
          console.log(r, "sibamdeyresponse");
          if (r.errorCode == 0) {
            // setErrorMessage(r.message)
            // toast.success(r.message);
            // navigate("/dashboard/dept-userlist");
          } else {
            // setErrorMessage(r.message)
            // toast.error(r.message);
          }
        }
      );
    }
  };

  const onGp = (e) => {
    setGp(e.target.value);
  };
  return (
    <div className="flex-grow ">
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={errorMessage?.message}
        // isSuccess={errorMessage?.errorCode === 0 ? true : false}
        to="dno-userlist"
        isSuccess={!Boolean(errorMessage?.errorCode)}
      />
      <ToastContainer />
      <div className="mx-auto">
        <BreadCrumb page={"Dno User"} className="px-12"/>
        <form className="flex">
          <div className="w-full px-32 border rounded-md border-zinc-200 shadow-md mx-12 pt-6 space-y-6 pb-10">
            <div className="flex items-center space-x-4">
              <div
                className={classNames(
                  userData?.category == "DEPT" && "w-full",
                  userData?.category == "DIST" && "w-1/2",
                  userData?.category == "BLOCK" && "w-1/3"
                )}
              >
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
              {userData?.category !== "HQ" ? (
                <div
                  className={classNames(
                    userData?.category == "DIST" && "w-1/2",
                    userData?.category == "BLOCK" && "w-1/3"
                  )}
                >
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Block
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onBlock}
                  >
                    <option value="" selected hidden>
                      {userData?.category === "BLOCK"
                        ? blockDropdown
                        : "Select a block"}
                    </option>
                    {blockDropdown}
                  </select>
                </div>
              ) : (
                ""
              )}
              {userData?.category === "BLOCK" ? (
                <div className={classNames("w-1/3")}>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gram Panchayat
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onGp}
                  >
                    <option value="" selected hidden>
                      Select a Gram Panchayat
                    </option>
                    {GpListDropdown}
                  </select>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex space-x-4">
              <div className="w-2/5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name of the {userData?.category == "HQ" && "DNO"}
                  {userData?.category == "DIST" && "BDO"}
                  {userData?.category == "BLOCK" && "Officer"}
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={onNodalOfficerName}
                  placeholder="Enter Name ..."
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-3/5">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {userData?.category == "HQ" && "DNO"}
                  {userData?.category == "DIST" && "BDO"}
                  {userData?.category == "BLOCK" && "Officer"} Designation
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

            <div className="flex items-center space-x-4">
              <div className="w-2/5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {userData?.category == "HQ" && "DNO"}
                  {userData?.category == "DIST" && "BDO"}
                  {userData?.category == "BLOCK" && "Officer"} Mobile Number
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="tel"
                  name="username"
                  maxLength={10}
                  type="text"
                  value={contactNumber}
                  autoComplete="username"
                  onChange={onContactNumber}
                  placeholder="Mobile Number..."
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-3/5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {userData?.category == "HQ" && "DNO"}
                  {userData?.category == "DIST" && "BDO"}
                  {userData?.category == "BLOCK" && "Officer"} Email Address
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={onEmail}
                  placeholder="Email Address..."
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            {/* {
              userData?.category === "HQ" ? "" :

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub-Division
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    onChange={onSubDivision}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  >
                    <option value="" selected hidden>


                      {
                        userData?.category === "SUB" ||
                          userData?.category === "BLOCK"
                          ? subDivisionDropdown : "Select a sub-division"
                      }
                    </option>
                    {subDivisionDropdown}
                  </select>
                </div>
            } */}

            {/* {
              userData?.category === "HQ" ? "" :
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GP
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
            } */}

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
                placeholder="Office Address..."
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="button"
                className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onRegister}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dno;
