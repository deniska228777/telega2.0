import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";
import axiosInstance from "../axios";

export default function PrivateRoutes() {
  const { expiry, LogOut, setExpiry, setToken, token } = useAuth();
  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (!token || Date.now() / 1000 > parseInt(expiry, 10)) {
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
  }, [expiry, token]);
  return <Outlet />;
}
