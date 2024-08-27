import { useState, createContext, useContext } from "react";
import axiosInstance from "../axios.js";
import { useNavigate } from "react-router";

const Auth = createContext();

let updateAuthState;

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  
  const [expiry, setExpiry] = useState(localStorage.getItem("expiry") || "");

  const navigate = useNavigate();

  console.log(username)

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

  updateAuthState = updAuthState;

  async function SignUp(data) {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      updateAuthState({
        username: response.data?.user?.username,
        email: response.data?.user?.email,
        userId: response.data?.user?.id,
        expiry: response.data?.expiry,
        token: response.data?.accessToken
      })
      console.log(response);
      console.log(response.data.user.username);
      navigate("/");
    } catch (error) {
      console.log(error)
      localStorage.setItem("signupErr", error.response.data || 'unknown');
    }
  }
  async function Login(data) {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      updateAuthState({
        username: response.data?.user?.username,
        email: response.data?.user?.email,
        userId: response.data?.user?.id,
        expiry: response.data?.expiry,
        token: response.data?.accessToken
      })
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
      value={{ username, email, userId, expiry, token, setToken, setExpiry, Login, SignUp, LogOut }}
    >
      {children}
    </Auth.Provider>
  );
}

export {updateAuthState};

export const useAuth = () => {
  return useContext(Auth);
};
