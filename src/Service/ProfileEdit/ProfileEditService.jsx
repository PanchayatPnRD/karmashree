import webApi, { baseURL } from "../../WebApi/WebApi";

export const getUserList = async (userId) => {
    console.log(userId, "userId")
    return await webApi.get(`/api/user/viewuser/${userId}`,
    );
}