import React, { useState, useEffect } from "react";
import {
  updateNewUser,
  getAllDesignationList,
  getAllDepartmentList,
  getAllDistrictList,
  getAllRoleList,
  getAllSubDivisionList,
  getAllBlockList,
} from "../../Service/NewUserService";
import { Button, Modal } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";
import { getUserList } from "../../Service/ProfileEdit/ProfileEditService";
const Profile = () => {
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
  const [allUserList, setAllUserList] = useState({
    userName: "",
    designationID: "",
    contactNo: "",
    email: "",
    role_type: "",
    UserAddress: "",
    technical_officer: "",
    tech_designation_id: "",
    tech_mobile: "",
    tech_email: "",
    officeName_hd: "",
  });

  useEffect(() => {
    const jsonString = sessionStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);

    getUserList(data?.userIndex).then(function (result) {
      const response = result?.data?.result;
      setAllUserList(response);
    });

    getAllDepartmentList(data?.departmentNo).then(function (result) {
      const response = result?.data?.result;
      setAllDepartmentList(response);
    });

    getAllDesignationList(data?.category).then(function (result) {
      const response = result?.data?.result;
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
    setAllUserList({ ...allUserList, officeName_hd: e.target.value });
  };

  const onNodalOfficerName = (e) => {
    setNodalOfficerName(e.target.value);
    setAllUserList({ ...allUserList, userName: e.target.value });
  };

  const onContactNumber = (e) => {
    if (e.target.value.length <= 10) {
      setContactNumber(e.target.value);
      setAllUserList({ ...allUserList, contactNo: e.target.value });
    }
  };

  const onEmail = (e) => {
    setEmailInput(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(emailRegex.test(e.target.value));
    setAllUserList({ ...allUserList, email: e.target.value });
  };

  const onUserAddress = (e) => {
    setUserAddress(e.target.value);
    setAllUserList({ ...allUserList, UserAddress: e.target.value });
  };

  const onSubDivision = (e) => {
    setSubDivision(e.target.value);
  };

  const onBlock = (e) => {
    setBlock(e.target.value);
  };

  const onRole = (e) => {
    setRole(e.target.value);
    setAllUserList({ ...allUserList, role_type: e.target.value });
  };

  const onDesignation = (e) => {
    setDesignation(e.target.value);
    setAllUserList({ ...allUserList, designationID: e.target.value });
  };

  const onAddTechnicalOfficer = (e) => {
    setIsChecked(!isChecked);
  };

  const onTechnicalOfficerName = (e) => {
    setTechnicalOfficerName(e.target.value);
    setAllUserList({ ...allUserList, technical_officer: e.target.value });
  };

  const onTechnicalOfficerDesignation = (e) => {
    setTechnicalOfficerDesignation(e.target.value);
    setAllUserList({ ...allUserList, tech_designation_id: e.target.value });
  };

  const onTechnicalOfficerContactNumber = (e) => {
    setTechnicalOfficerContactNumber(e.target.value);
    setAllUserList({ ...allUserList, tech_mobile: e.target.value });
  };

  const onTechnicalOfficerEmail = (e) => {
    setTechnicalOfficerEmail(e.target.value);
    setAllUserList({ ...allUserList, tech_email: e.target.value });
  };

 
  const onRegister = () => {
    if (allUserList?.userName === "") {
      toast.error("Please type your nodal officer name");
    } else if (allUserList?.designation === "") {
      toast.error("Please select Nodal officer designation");
    } else if (allUserList?.contactNo.length != 10) {
      toast.error("Please type 10 digit Nodal officer mobile number");
    } else if (!allUserList?.email) {
      toast.error("Please enter Nodal officer valid email id");
    } else if (
      userData?.category === "HD" &&
      allUserList?.officeName_hd === ""
    ) {
      toast.error("Please type your office name");
    } else if (allUserList?.UserAddress === "") {
      toast.error("Please type user address");
    } else {
      // setOpenModal(true);

      updateNewUser(
        userData?.userIndex,
        allUserList?.userName,
        allUserList?.designationID,
        allUserList?.contactNo,
        allUserList?.email,
        allUserList?.role_type,
        allUserList?.UserAddress,
        allUserList?.technical_officer,
        allUserList?.tech_designation_id,
        allUserList?.tech_mobile,
        allUserList?.tech_email,
        allUserList?.officeName_hd,

        (r) => {
          setErrorMessage(r);

          if (r.errorCode == 0) {
            // setErrorMessage(r.message)
            toast.success(r.message);
            navigate("/dashboard/profile");
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
        // isSuccess={errorMessage?.errorCode === 0 ? true : false}
        isSuccess={!Boolean(errorMessage?.errorCode)}
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
                      Profile
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
            {userData?.category === "HQ" ? (
              ""
            ) : (
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                  <span className="text-red-500 "> * </span>
                </label>
                <select
                  disabled
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
            )}
            {/* {userData?.category === "HQ" ? (
              ""
            ) : (
              <div>
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
            )} */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nodal Officer Name
                <span className="text-red-500 "> * </span>
              </label>
              <input
                id="nodalOfficerName"
                name="nodalOfficerName"
                type="text"
                autoComplete="username"
                onChange={onNodalOfficerName}
                placeholder="type your Nodal officer name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={allUserList?.userName}
              />
            </div>
            <div>
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
                  {/* {allDesignationList.find(c => c.designationId === allUserList?.designationID)?.designation} */}
                  {allUserList?.designationID === "1"
                    ? "Select a Designation"
                    : allDesignationList.find(
                        (c) => c.designationId === allUserList?.designationID
                      )?.designation}
                </option>
                {designationListDropdown}
              </select>
            </div>
            <div>
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
                type="number"
                autoComplete="username"
                onChange={onContactNumber}
                placeholder="type your Contact number"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={allUserList?.contactNo}
              />
            </div>
            <div>
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
                value={allUserList?.email}
              />
            </div>

            {userData?.category === "HQ" ||
            userData?.category === "HD" ||
            userData?.category === "DEPT" ||
            (userData?.category === "BLOCK" && userData?.subDivision === "") ? (
              ""
            ) : (
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub-Division
                  <span className="text-red-500 "> * </span>
                  {/* <span className="text-red-500 "> * </span> */}
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  onChange={onSubDivision}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
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
              <div>
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
                  value={allUserList?.officeName_hd}
                />
              </div>
            )}
            <div>
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
                  {allUserList?.role_type
                    ? allRoleList.find((c) => c.id === allUserList?.role_type)
                        ?.role_type
                    : "Select a role"}
                </option>
                {roleListDropdown}
              </select>
            </div>
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
                value={allUserList?.UserAddress}
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
                <div>
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
                    value={allUserList?.technical_officer}
                  />
                </div>
                <div>
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
                    value={allUserList?.tech_designation_id}
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    Technical officer mobile number
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="number"
                    autoComplete="username"
                    onChange={onTechnicalOfficerContactNumber}
                    placeholder="type your Contact number"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    value={allUserList?.tech_mobile}
                  />
                </div>
                <div>
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
                    value={allUserList?.tech_email}
                  />
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
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
