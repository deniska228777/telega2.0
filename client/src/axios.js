import axios from "axios";
import { updateAuthState } from "./auth/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6556",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
})

axiosInstance.interceptors.response.use(async (config) => {


  return config;
}, async (error) => {
  return Promise.reject(error);
})

export default axiosInstance;
