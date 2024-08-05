import webApi, { baseURL } from "../../WebApi/WebApi";

export const getUserList = async (userId) => {
  return await webApi.get(`/api/user/viewuser/${userId}`);
};
