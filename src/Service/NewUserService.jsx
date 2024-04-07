import webApi, { baseURL } from "../WebApi/WebApi";

export const getAllDepartmentList = async (deptId) => {
    console.log(deptId,"deptId")
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
    return await webApi.get(`/api/mastertable/Getdesignation/${category}`,
    );
}