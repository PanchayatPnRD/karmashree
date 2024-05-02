import axios from "axios";
import { devApi } from "../WebApi/WebApi";

export const fetch = {
  get: async (route, extenstion) => {
    return axios.get(devApi + route + extenstion);
  },
  post: async (data, route, extenstion) => {
    return axios.post(devApi + route + extenstion, data);
  },
  put: async (data, route, extenstion) => {
    return axios.put(devApi + route + extenstion, data);
  },
};
