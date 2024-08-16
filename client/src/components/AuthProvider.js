import { useState, useEffect, createContext, useContext } from "react";
import axiosInstance from "../axios.js";
import { useNavigate } from "react-router";

const Auth = createContext();

export default function AuthProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [expiry, setExpiry] = useState(localStorage.getItem("expiry") || "");

  console.log(username, email, userId, expiry, token)

  const navigate = useNavigate();

  function updAuthState(data) {
    const { username, email, userId, token, expiry } = data;

    setUsername(username);
    setEmail(email);
    setUserId(userId);
    setExpiry(expiry);
    setToken(token);

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiry", expiry);
    localStorage.setItem("token", token);
  }

  async function SignUp(data) {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      console.log(response);
      updAuthState({
        username: response.data.user.username,
        email: response.data.user.email,
        userId: response.data.user.id,
        expiry: response.data.expiry,
        token: response.data.accessToken,
      });
      console.log(response.data.user.id);
      navigate("/");
    } catch (error) {
      console.log(error)
      localStorage.setItem("signupErr", error.response.data);
    }
  }
  async function Login(data) {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      updAuthState({
        username: response.data.user.username,
        email: response.data.user.email,
        userId: response.data.user.id,
        expiry: response.data.expiry,
        token: response.data.accessToken,
      });
      navigate("/");
    } catch (error) {
      localStorage.setItem("loginErr", error.response.data);
    }
  }
  async function LogOut() {
    try {
      await axiosInstance.post("/auth/logout");
      updAuthState({
        username: "",
        email: "",
        userId: "",
        expiry: "",
        token: "",
      });
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Auth.Provider
      value={{ username, email, userId, expiry, token, updAuthState, setToken, setExpiry, Login, SignUp, LogOut }}
    >
      {children}
    </Auth.Provider>
  );
}

export const useAuth = () => {
  return useContext(Auth);
};
