import axios from "axios";
import { devApi } from "../WebApi/WebApi";




const axiosInstance = axios.create({
  baseURL: devApi,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("karmashree_AuthToken");// Implement a function to retrieve the token from cookies
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
