import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6556",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

export default axiosInstance;
