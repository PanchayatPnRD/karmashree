import webApi, { baseURL } from "../WebApi/WebApi";

export const getAllDashboardList = async () => {
    return await webApi.get(`/api/schememaster/dashboard`,
    );
}