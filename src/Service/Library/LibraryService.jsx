import webApi, { baseURL } from "../../WebApi/WebApi";

export const addLibrary = async (data, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/api/user/createfileupload`, data);
    if (res?.data?.errorCode == 0) {
      const r = res.data;

      return onSuccess(r);
    } else if (res?.data?.errorCode == 1) {
      const r = res.data;

      return onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {}
};

export const getAllLibraryList = async (data) => {
  return await webApi.get(`/api/user/list-by-category`);
};
