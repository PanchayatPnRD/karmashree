import React, { useState, useEffect } from 'react';
import { getAllDesignationList,getAllDepartmentList, getAllDistrictList, getAllRoleList, getAllSubDivisionList, getAllBlockList } from "../../Service/NewUserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewUser = () => {
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
  const [allSubDivisionList, setAllSubDivisionList] = useState([])
  const [allBlockList, setAllBlockList] = useState([])
  const [userData, setUserData] = useState(null);
  const [subDivision, setSubDivision] = useState("");
  const [block, setBlock] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [role, setRole] = useState("");
  const [allDesignationList, setAllDesignationList] = useState([]);
  const [designation, setDesignation] = useState("");

  


  useEffect(() => {
    const jsonString = localStorage.getItem('karmashree_User');
    const data = JSON.parse(jsonString);
    setUserData(data);
    getAllDepartmentList(data?.departmentNo).then(function (result) {
      const response = result?.data?.result;
      setAllDepartmentList(response);
    });

    getAllDesignationList(data?.category).then(function (result) {
      const response = result?.data?.result;
      console.log(response,"sibamdey")
      setAllDesignationList(response?.result);
    });
    getDistrictDataList();
    getRoleDataList();
  }, []);

//Designation list
  let designationListDropdown = <option>Loading...</option>;
  if (allDesignationList && allDesignationList.length > 0) {
    designationListDropdown = allDesignationList.map((desgRow, index) => (
      <option value={desgRow.designationId}>{desgRow.designation}</option>
    ))
  }

  //Department list
  let departmentListDropdown = <option>Loading...</option>;
  if (allDepartmentList && allDepartmentList.length > 0) {
    departmentListDropdown = allDepartmentList.map((deptRow, index) => (
      <option value={deptRow.departmentNo}>{deptRow.departmentName}</option>
    ))
  }

  //District list
  async function getDistrictDataList() {
    getAllDistrictList().then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });
  }

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ))
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
    ))
  }

  const onDepartment = (e) => {
    setDepartment(e.target.value);
  }

  const onDistrict = (e) => {
    console.log(e.target.value, "district")
    setDistrict(e.target.value)
    getAllSubDivisionList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllSubDivisionList(response);
    });

    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);


    });
  }

  let subDivisionDropdown = <option>Loading...</option>;
  if (allSubDivisionList && allSubDivisionList.length > 0) {
    subDivisionDropdown = allSubDivisionList.map((subdivRow, index) => (
      <option value={subdivRow.subdivCode}>{subdivRow.subdivName}</option>
    ))
  }
  let blockDropdown = <option>Loading...</option>;
  if (allBlockList && allBlockList.length > 0) {
    blockDropdown = allBlockList.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.blockName}</option>
    ))
  }
  const onUserId = (e) => {
    setUserId(e.target.value)
  }

  const onPassword = (e) => {
    setPassword(e.target.value)
  }

  const onOfficeName = (e) => {
    setOfficeName(e.target.value)
  }

  const onNodalOfficerName = (e) => {
    setNodalOfficerName(e.target.value)

  }

  const onContactNumber = (e) => {
    setContactNumber(e.target.value)
  }

  const onEmail = (e) => {
    setEmailInput(e.target.value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(emailRegex.test(e.target.value));
  }

  const onUserAddress = (e) => {
    setUserAddress(e.target.value)
  }

  const onSubDivision = (e) => {
    setSubDivision(e.target.value)
  }

  const onBlock = (e) => {
    setBlock(e.target.value)
  }

  const onRole = (e) => {
    setRole(e.target.value)
  }

const onDesignation=(e)=>{
  setDesignation(e.target.value)
}

  console.log(district, subDivision, block, "ababa")
  const onRegister = () => {
    if (userData?.category === "HQ" && department === "") {
      toast.error("Please select a department")
    } else if (!userData?.category === "HQ" || userData?.category === "HD" && district === ""|| userData?.category === "DEPT" && district === ""|| userData?.category === "DIST" && district === ""|| userData?.category === "SUB" && district === ""|| userData?.category === "BLOCK" && district === "") {
      toast.error("Please select a district")
    } else if (!userData?.category === "HQ" ||userData?.category === "DIST" && subDivision === ""||userData?.category === "SUB" && subDivision === ""|| userData?.category === "BLOCK" && subDivision === "") {
      toast.error("Please select a sub division")
    } else if (!userData?.category === "HQ" && block === ""|| userData?.category === "SUB" && block === ""|| userData?.category === "BLOCK" && block === "") {
      toast.error("Please select a block")
    } else if (userId === "") {
      toast.error("Please type your userId")
    } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      toast.error("Password must contain at least 12 characters, including uppercase, lowercase,numerical and special characters.")
    } else if (password.length != 12) {
      toast.error("minimun 12 digit password are required")
    } else if (officeName === "") {
      toast.error("Please type your office name")
    } else if (nodalOfficerName === "") {
      toast.error("Please type your nodal officer name")
    } else if (contactNumber.length != 10) {
      toast.error("Please type your 10 digit contact number")
    } else if (!email) {
      toast.error("Please enter valid email id")
    } else if (designation==="") {
      toast.error("Please select a designation")
    }else if (userAddress === "") {
      toast.error("Please type user address")
    } else if (role === "") {
      toast.error("Please selct role")
    } else {

    }
  }
  return (
    <div className="flex-grow ">
      <ToastContainer />
      <div className="mx-auto mt-2">
        <div className="flex w-full space-x-4">
          <div>
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
                {userData?.category === "HQ" ? "Select a Department" : departmentListDropdown}
              </option>
              {departmentListDropdown}
            </select>
          </div>
          {userData?.category === "HQ" ? "" :
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
                  Select a district
                </option>
                {districtListDropdown}
              </select>
            </div>}
          {userData?.category === "HQ" || userData?.category === "HD" || userData?.category === "DEPT" ? "" :
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
                  Select a sub-division
                </option>
                {subDivisionDropdown}
              </select>
            </div>}
        </div>

        <div className="flex w-full space-x-4">
          {userData?.category === "HQ" || userData?.category === "HD" || userData?.category === "DEPT" || userData?.category === "DIST" ? "" :
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
                  Select a block
                </option>
                {blockDropdown}
              </select>
            </div>}
          {userData?.category === "HQ" || userData?.category === "HD" || userData?.category === "DEPT" || userData?.category === "DIST" || userData?.category === "SUB" || userData?.category === "BLOCK"? "" :
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
            </div>}
          {userData?.category === "HQ" || userData?.category === "HD" || userData?.category === "DEPT" || userData?.category === "DIST" || userData?.category === "SUB" || userData?.category === "BLOCK"? "" :
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Area
              </label>
              <select
                id="country"
                name="country"
                required
                // onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="" selected hidden>
                  Select a area
                </option>
                <option value="rural">Rural</option>
                <option value="urban">Urban</option>
              </select>
            </div>}
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Id
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={onUserId}
              placeholder="type your User Id"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
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
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Office Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={onOfficeName}
              placeholder="type your office name"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nodal Officer Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={onNodalOfficerName}
              placeholder="type your Nodal officer name"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="username"
              name="username"
              type="number"
              autoComplete="username"
              onChange={onContactNumber}
              placeholder="type your Contact number"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={onEmail}
              placeholder="type your email id"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <select
              id="country"
              name="country"
              onChange={onDesignation}
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
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
              className="block text-sm font-medium text-gray-700"
            >
              User Address
            </label>
            <textarea
              id="username"
              name="username"
              type="textarea"
              autoComplete="username"
              onChange={onUserAddress}
              placeholder="type your user address"
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              onChange={onRole}
              className="mt-1 p-2 block w-1/3 border border-gray-300 rounded-md"
            >
              <option value="" selected hidden>
                Select a role
              </option>
              {roleListDropdown}
            </select>
          </div>
          <div>
            <button
              type="button"
              className="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
