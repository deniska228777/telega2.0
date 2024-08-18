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
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

axiosInstance.interceptors.response.use(async (config) => {
  updateAuthState({
    username: config.data?.user?.username,
    email: config.data?.user?.email,
    userId: config.data?.user?.id,
    expiry: config.data?.expiry,
    token: config.data?.accessToken
  })

  return config;
}, async (error) => {
  throw error;
})

export default axiosInstance;
