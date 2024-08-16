import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import axiosInstance from "../axios";

export default function PrivateRoutes() {
  const { expiry, LogOut, setExpiry, setToken } = useAuth();
  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (Date.now() / 1000 > parseInt(expiry, 10)) {
        try {
          const newToken = await axiosInstance.get('/refreshtoken');
          setToken(newToken.data.accessToken);
          setExpiry(newToken.data.expiry);

          localStorage.setItem('token', newToken.data.accessToken);
          localStorage.setItem('expiry', newToken.data.expiry);
        } catch (error) {
          console.error('Token Refresh Error', error);
          LogOut();
        }
      }
    };
    checkTokenExpiry();
  }, [expiry]);
  return <Outlet />;
}
