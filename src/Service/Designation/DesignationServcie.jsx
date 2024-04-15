import webApi, { baseURL } from "../../WebApi/WebApi";

export const getAllDesignationList = async () => {    
    return await webApi.get(`/api/mastertable/DesignationList`,
    );
}