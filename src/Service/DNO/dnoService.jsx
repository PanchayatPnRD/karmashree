import webApi, { baseURL } from "../../WebApi/WebApi";

export const addNewDNO = async (
  departmentNo,
  districtcode,
  subDivision,
  blockCode,
  officeName,
  nodalOfficerName,
  contactNo,
  email,
  designation,
  userAddress,
  role,
  category,
  deptWing,
  area,
  gpCode,
  userType,
  role_type,
  pwd,
  entryBy,
  created_by,
  technicalOfficerName,
  technicalOfficerDesignation,
  technicalOfficerContactNumber,
  technicalOfficerEmail,
  onSuccess,
  onFailure
) => {
  console.log(
    departmentNo,"depart",
    districtcode,
    subDivision,
    blockCode,
    officeName,
    nodalOfficerName,
    contactNo,
    email,
    designation,
    userAddress,
    role,
    category,
    deptWing,
    area,
    gpCode,
    userType,"usertype",
    role_type,
    pwd,
    entryBy,
    created_by,
    technicalOfficerName,
    technicalOfficerDesignation,
    technicalOfficerContactNumber,
    technicalOfficerEmail,
    "formData"
  );
  try {
    const res = await webApi.post(`/api/user/create_user`, {
      category: category,
      departmentNo: 0,
      districtcode: parseInt(districtcode === "" ? 0 : districtcode),
      subDivision: parseInt(subDivision === "" ? 0 : subDivision),
      blockCode: parseInt(blockCode === "" ? 0 : blockCode),
      gpCode: parseInt(gpCode === "" ? 0 : gpCode),
      userType: 1,
      role_type: 1,
      // userId:userId,
      pwd: pwd,
      // encryptpassword:password,
      officeName: officeName,
      userName: nodalOfficerName,
      contactNo: contactNo,
      email: email,
      designationID: designation,
      UserAddress: userAddress,
      entryBy: entryBy,
      created_by: created_by,
      currentStatus: "A",
      deptWing: deptWing,
      technical_officer: technicalOfficerName,
      tech_designation_id: technicalOfficerDesignation,
      tech_mobile: technicalOfficerContactNumber,
      tech_email: technicalOfficerEmail,
      dno_status: "1",
    });
    if (res?.data?.errorCode == 0) {
      const r = res.data;
      console.log(r, "rerere");

      return onSuccess(r);
    } else if (res?.data?.errorCode == 1) {
      const r = res.data;
      console.log(r, "rerere");

      return onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    console.log("fdgdf");
  }
};

export const getAllDnoUserList = async (data) => {
  return await webApi.get(`/api/user/getDnolist?created_by=${data}`);
};

export const getAllDesignationList = async () => {
  return await webApi.get(`/api/mastertable/DesignationList`);
};
