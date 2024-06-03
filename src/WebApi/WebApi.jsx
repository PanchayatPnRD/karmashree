import axios from "axios";

//
// export const devApi = "http://43.239.110.159:8094";
// export const devApi = "http://localhost:8094";

export const devApi = "http://localhost:8094";

export let baseURL;
const subdomain = window.location.host.split(".")[0];

baseURL = devApi;
let instance = axios.create({
  baseURL: baseURL,
  responseType: "json",
});

const authToken = localStorage.getItem("karmashree_AuthToken");
console.log(authToken, "authToken");

// Use an interceptor to attach the token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("karmashree_AuthToken");
    if (token) {
      config.headers["token"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
