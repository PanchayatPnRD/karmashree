import axios from "axios";

//
// export const devApi = "http://43.239.110.159:8094";
// export const devApi = "http://localhost:8094";

export const devApi = import.meta.env.VITE_API_KEY;

export let baseURL;
const subdomain=window.location.host.split(".")[0];

baseURL = devApi; 
let instance = axios.create({
  baseURL: baseURL,
  responseType: "json",
});

const authToken = localStorage.getItem("karmashree_AuthToken");

if (authToken) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
}

export default instance;
