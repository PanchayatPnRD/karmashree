import React, { useState, useEffect } from "react";
import {
  getAllDesignationList,
  getAllDepartmentList,
  getAllDistrictList,
  getAllRoleList,
  getAllSubDivisionList,
  getAllBlockList,
} from "../../Service/NewUserService";
import { addNewDNO } from "../../Service/DNO/dnoService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";

const Deno = () => {
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

  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);
    getAllDepartmentList(data?.departmentNo).then(function (result) {
      const response = result?.data?.result;
      setAllDepartmentList(response);
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
    getAllSubDivisionList(data?.districtcode, data?.subDivision).then(function (result) {
      const response = result?.data?.result;
      setAllSubDivisionList(response);
    });
    getAllBlockList(data?.districtcode, data?.blockCode).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });
    getRoleDataList();
  }, []);
  console.log(allDistrictList, "allDistrictList")

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
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }

  //Role list
  async function getRoleDataList() {
    getAllRoleList().then(function (result) {
      const response = result?.data?.result;
      setAllRoleList(response);
    });
  }

  let roleListDropdown = <option>Loading...</option>;
  if (allRoleList && allRoleList.length > 0) {
    roleListDropdown = allRoleList.map((roleRow, index) => (
      <option value={roleRow.id}>{roleRow.role_type}</option>
    ));
  }

  const onDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const onDistrict = (e) => {
    console.log(e.target.value, "district");
    setDistrict(e.target.value);
    getAllSubDivisionList(userData?.districtcode ? userData?.districtcode : e.target.value, userData?.subDivision).then(function (result) {
      const response = result?.data?.result;
      setAllSubDivisionList(response);
    });

    getAllBlockList(e.target.value, userData?.blockCode).then(function (result) {
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

    }
    else if (nodalOfficerName === "") {
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
      setOpenModal(true);
      addNewDNO(
        userData?.category === "HQ"
          ? department
          : allDepartmentList[0]?.departmentNo,

        userData?.category === "HQ"
          ? district
          : userData?.districtcode
            ,

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
          ? "DIST" : "BLOCK"
        ,
        "",
        "A",
        1,
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
          setErrorMessage(r)

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
  return (
    <div className="flex-grow ">
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        isSuccess={errorMessage?.errorCode === 0 ? true : false}
        // isSuccess={!Boolean(errorMessage?.errorCode===0)}

        errorMsg={errorMessage?.message}
      />
      <ToastContainer />
      <div className="mx-auto mt-2">
        <div className="bg-white rounded-lg p-12">
          <div className="shadow-md -mb-4">
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
                      DNO User
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <br />
          </div>
        </div>

        <form className="flex">
          <div className="w-full px-36 space-y-6 pb-10">
            {/* <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Department
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
            </div> */}

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                District
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
                    userData?.category === "DIST" || userData?.category === "SUB" ||
                    userData?.category === "BLOCK"
                    ? districtListDropdown : "Select a District"
                  }
                </option>
                {districtListDropdown}
              </select>
            </div>
            {
              userData?.category === "HQ" ? "" :
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Block
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onBlock}
                  >
                    <option value="" selected hidden>
                      {userData?.category === "BLOCK" ? blockDropdown :
                        "Select a block"}
                    </option>
                    {blockDropdown}
                  </select>
                </div>
            }
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name of the DNO
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                onChange={onNodalOfficerName}
                placeholder="Name of the DNO..."
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                DNO Designation
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

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                DNO Mobile Number
              </label>
              <input
                id="tel"
                name="username"
                maxLength={10}
                type="number"
                value={contactNumber}
                autoComplete="username"
                onChange={onContactNumber}
                placeholder="DNO Mobile Number..."
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                DNO Email Address
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                onChange={onEmail}
                placeholder="DNO Email Address..."
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
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

export default Deno;
