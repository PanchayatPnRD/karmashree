import axios from "axios";
import { devApi } from "../WebApi/WebApi";

const authToken = localStorage.getItem("karmashree_AuthToken");
console.log(authToken,"tipi");

const axiosInstance = axios.create({
  baseURL: devApi,
  responseType: "json",
  headers: {
    "token": authToken
  }
});


export const fetch = {
  get: async (route, extenstion) => {
    return extenstion
      ? axiosInstance.get(devApi + route + extenstion)
      : axiosInstance.get(devApi + route);
  },
  post: async (data, route, extenstion) => {
    return extenstion
      ? axiosInstance.post(devApi + route + extenstion, data)
      : axiosInstance.post(devApi + route, data);
  },
  put: async (data, route, extenstion) => {
    return extenstion
      ? axiosInstance.put(devApi + route + extenstion, data)
      : axiosInstance.put(devApi + route, data);
  },
};
