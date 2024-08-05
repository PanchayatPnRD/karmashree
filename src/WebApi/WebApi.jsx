import axios from "axios";

//
// export const devApi = "http://43.239.110.159:8094";
// export const devApi = "http://localhost:8094";

export const devApi = import.meta.env.VITE_API_KEY;

export let baseURL;
const subdomain = window.location.host.split(".")[0];

baseURL = devApi;
let instance = axios.create({
  baseURL: baseURL,
  responseType: "json",
});

const authToken = sessionStorage.getItem("karmashree_AuthToken");



instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("karmashree_AuthToken");
    if (token) {
      config.headers["token"] = token;
    }
    config.headers["x-api-key"] = import.meta.env.VITE_X_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;



