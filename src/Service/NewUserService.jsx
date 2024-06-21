import webApi, { baseURL } from "../WebApi/WebApi";

export const getAllDepartmentList = async (deptId) => {
    console.log(deptId, "deptId")
    return await webApi.get(`/api/mastertable/GetDeptbyId/${deptId}`,
    );
}

export const getAllDistrictList = async (data) => {
    return await webApi.get(`/api/mastertable/getAllDistricts/${data ? data : 0}`,
    );
}

export const getAllRoleList = async () => {
    return await webApi.get(`/api/mastertable/roles`,
    );
}

export const getAllSubDivisionList = async (districtId, subDivision) => {
    console.log(districtId, subDivision, "districtId,subDivision")
    return await webApi.get(`/api/mastertable/getSubdivison/${parseInt(districtId)}/${parseInt(subDivision) ? parseInt(subDivision) : 0}`,
    );
}

export const getAllBlockList = async (districtId, blockCode) => {
    return await webApi.get(`/api/mastertable/getBlock/${parseInt(districtId)}/${parseInt(blockCode) ? parseInt(blockCode) : 0}`,
    );
}

export const getAllBlockListbySub = async (districtId, subdivId) => {
    console.log(districtId, subdivId,"districtId, subdivId")
    return await webApi.get(`/api/mastertable/getBlockbydistandsub/${parseInt(districtId)}/${parseInt(subdivId)}`,
    );
}
export const getAllDesignationList = async (category) => {
    return await webApi.get(`/api/mastertable/Getdesignation/${"HQ"}`,
    );
}

export const getAllPedastalList = async (departmentNo,deptwing) => {
    return await webApi.get(`/api/mastertable/getAllPedestal/${departmentNo}/${deptwing===""?0:deptwing}`,
    );
}

export const getAllGramPanchayatList = async (districtCode, BlockCode) => {
    console.log(districtCode, BlockCode, "districtCode")
    return await webApi.get(`/api/mastertable/getGpaction/${parseInt(districtCode)}/${parseInt(BlockCode)}`,
    );
}

//ADD USER


// export const addNewUser = async (department, district, subdivision, block, userId, password,
//     officeName, nodalOfficerName, contactNumber, emailInput, designation, userAddress, role, onSuccess, onFailure) => {

export const addNewUser = async (departmentNo, districtcode, subDivision, block, officeName, nodalOfficerName, contactNo, email, designation, userAddress, role, category,
    deptWing, currentStatus, area,areaGp, municipalityCode, userType, role_type, pwd, entryBy, created_by, technicalOfficerName,
    technicalOfficerDesignation, technicalOfficerContactNumber, technicalOfficerEmail, onSuccess, onFailure) => {


    console.log(departmentNo, districtcode, subDivision, block, officeName, nodalOfficerName, contactNo, email, designation, userAddress, role, category,
        deptWing, currentStatus, area,areaGp, municipalityCode, userType, role_type, pwd, entryBy, created_by, technicalOfficerName,
        technicalOfficerDesignation, technicalOfficerContactNumber, technicalOfficerEmail, "formData")
    try {
        const res = await webApi.post(
            `/api/user/create_user`,
            {
                category: category,
                departmentNo: departmentNo,
                districtcode: districtcode ? districtcode : 0,
                subDivision: subDivision ? subDivision : 0,
                blockCode: block ? block : 0,
                gpCode: areaGp ? areaGp : 0,
                municipalityCode: municipalityCode ? municipalityCode : 0,
                userType: userType,
                role_type: role_type,
                pwd: pwd,
                area: area,
                officeName: officeName,
                userName: nodalOfficerName,
                contactNo: contactNo,
                email: email,
                designationID: designation,
                UserAddress: userAddress,
                entryBy: entryBy,
                created_by: created_by,
                currentStatus: currentStatus,
                deptWing: deptWing,
                technical_officer: technicalOfficerName,
                tech_designation_id: technicalOfficerDesignation,
                tech_mobile: technicalOfficerContactNumber,
                tech_email: technicalOfficerEmail,
                dno_status: 0
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

//update profile

export const updateNewUser = async (userIndex,nodalOfficerName,designation,
    contactNo,email,role_type,userAddress,technicalOfficerName,technicalOfficerDesignation,
    technicalOfficerContactNumber,technicalOfficerEmail,officeName_hd,onSuccess, onFailure) => {


   console.log(userIndex,nodalOfficerName,designation,
    contactNo,email,role_type,userAddress,technicalOfficerName,technicalOfficerDesignation,
    technicalOfficerContactNumber,technicalOfficerEmail,"userIndex")
    try {
        const res = await webApi.put(
            `/api/user/updateUser/${userIndex}`,
            {
                // category: category,
                // departmentNo: departmentNo,
                // districtcode: districtcode ? districtcode : 0,
                // subDivision: subDivision ? subDivision : 0,
                // blockCode: block ? block : 0,
                // gpCode: areaGp ? areaGp : 0,
                // municipalityCode: municipalityCode ? municipalityCode : 0,
                // userType: userType,
                // role_type: role_type,
                // pwd: pwd,
                // area: area,
                // officeName: officeName,
                userName: nodalOfficerName,
                designationID: designation,
                contactNo: contactNo,
                email: email,
                role_type: role_type,
                UserAddress: userAddress,
                officeName_hd:officeName_hd,
                // entryBy: entryBy,
                // created_by: created_by,
                // currentStatus: currentStatus,
                // deptWing: deptWing,
                technical_officer: technicalOfficerName,
                tech_designation_id: technicalOfficerDesignation,
                tech_mobile: technicalOfficerContactNumber,
                tech_email: technicalOfficerEmail,
                // dno_status: 0
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