import webApi, { baseURL } from "../WebApi/WebApi";

export const getAllDepartmentList = async (deptId) => {
    console.log(deptId, "deptId")
    return await webApi.get(`/api/mastertable/GetDeptbyId/${deptId}`,
    );
}

export const getAllDistrictList = async (data) => {
    return await webApi.get(`/api/mastertable/getAllDistricts/${data?data:0}`,
    );
}

export const getAllRoleList = async () => {
    return await webApi.get(`/api/mastertable/roles`,
    );
}

export const getAllSubDivisionList = async (districtId,subDivision) => {
    console.log(districtId,subDivision,"districtId,subDivision")
    return await webApi.get(`/api/mastertable/getSubdivison/${districtId}/${subDivision?subDivision:0}`,
    );
}

export const getAllBlockList = async (districtId,blockCode) => {
    return await webApi.get(`/api/mastertable/getBlock/${districtId}/${blockCode?blockCode:0}`,
    );
}

export const getAllDesignationList = async (category) => {
    return await webApi.get(`/api/mastertable/Getdesignation/${"HQ"}`,
    );
}

//ADD USER


// export const addNewUser = async (department, district, subdivision, block, userId, password,
//     officeName, nodalOfficerName, contactNumber, emailInput, designation, userAddress, role, onSuccess, onFailure) => {

export const addNewUser = async (departmentNo, districtcode, subDivision, blockCode, userId, password,
    officeName, nodalOfficerName, contactNo, email, designation, userAddress, role, category,
    deptWing,area,gpCode,userType,role_type,pwd,entryBy,created_by,technicalOfficerName,
    technicalOfficerDesignation,technicalOfficerContactNumber,technicalOfficerEmail,onSuccess, onFailure) => {


    console.log(departmentNo, districtcode, subDivision, blockCode, userId, password,
        officeName, nodalOfficerName, contactNo, email, designation, userAddress, role, category,
        deptWing,area,gpCode,userType,role_type,pwd,entryBy,created_by,technicalOfficerName,
        technicalOfficerDesignation,technicalOfficerContactNumber,technicalOfficerEmail,"formData")
    try {
        const res = await webApi.post(
            `/api/user/create_user`, 
                {
                    category:category,
                    departmentNo:departmentNo,
                    districtcode:districtcode,
                    subDivision:subDivision,
                    blockCode:blockCode,
                    gpCode:gpCode,
                    userType:userType,
                    role_type:role_type,
                    userId:userId,
                    pwd:pwd,
                    encryptpassword:password,
                    officeName:officeName,
                    userName:nodalOfficerName,
                    contactNo:contactNo,
                    email:email,
                    designationID:designation,
                    UserAddress:userAddress,
                    entryBy:entryBy,
                    created_by:created_by,
                    currentStatus:"A",
                    deptWing:deptWing,
                    technical_officer:technicalOfficerName,
                    tech_designation_id:technicalOfficerDesignation,
                    tech_mobile:technicalOfficerContactNumber,
                    tech_email:technicalOfficerEmail,
                },
            

        );
        if (res?.data?.errorCode == 0) {
            const r = res.data;
            console.log(r, "rerere")

            return onSuccess(r);

        } else if (res?.data?.errorCode == 1) {
            const r = res.data;
            console.log(r, "rerere")

            return onSuccess(r);
        } else {
            onFailure("Something Wrong! Please Try again later" + res.data);

        }
    } catch (error) {
        console.log("fdgdf")
    }
};

//user list

export const getAllUserList = async (data) => {
    return await webApi.get(`/api/user/getUserList?created_by=${data}`,
    );
}