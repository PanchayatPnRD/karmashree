import webApi, { baseURL } from "../WebApi/WebApi";

export const getAllDepartmentList = async (deptId) => {
    console.log(deptId, "deptId")
    return await webApi.get(`/api/mastertable/GetDeptbyId/${deptId}`,
    );
}

export const getAllDistrictList = async () => {
    return await webApi.get(`/api/mastertable/getAllDistricts`,
    );
}

export const getAllRoleList = async () => {
    return await webApi.get(`/api/mastertable/roles`,
    );
}

export const getAllSubDivisionList = async (districtId) => {
    return await webApi.get(`/api/mastertable/getSubdivison/${districtId}`,
    );
}

export const getAllBlockList = async (districtId) => {
    return await webApi.get(`/api/mastertable/getBlock/${districtId}`,
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
    deptWing,area,gpCode,userType,role_type,pwd,entryBy,created_by,onSuccess, onFailure) => {


    console.log(departmentNo, districtcode, subDivision, blockCode, userId, password,
        officeName, nodalOfficerName, contactNo, email, designation, userAddress, role, category,
        deptWing,area,gpCode,userType,role_type,pwd,entryBy,created_by,"formData")
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
                    password:password,
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