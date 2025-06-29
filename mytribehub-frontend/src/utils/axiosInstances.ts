import axios from "axios";
export const BASE_URL = "http://localhost:5000";

const axiosInstances = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstances;
