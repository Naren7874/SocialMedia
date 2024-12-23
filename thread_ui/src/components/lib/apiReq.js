import axios from "axios";


const apiReq = axios.create({
  baseURL: "https://linkup-e9b3bmgwfygzb3dc.centralindia-01.azurewebsites.net/api",
  withCredentials: true, 
});

export default apiReq