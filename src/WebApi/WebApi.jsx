import axios from "axios";

// const prodApi =  "https://nodeserver.mydevfactory.com:5000/api/v1" 

// const devApi = "http://127.0.0.1:8000/api/"
export const devApi = "http://43.239.110.159:8094"

export let baseURL;
const subdomain=window.location.host.split(".")[0];

baseURL = devApi; //prodApi //
// if (process.env.NODE_ENV === "production" && subdomain==="live") {
//   baseURL = prodApi;
// } else {
// }


//console.log(process.env.NODE_ENV);
let instance = axios.create({
  baseURL: baseURL,
  responseType: "json",
});

const authToken = localStorage.getItem("karmashree_AuthToken");

if (authToken) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
}

export default instance;
