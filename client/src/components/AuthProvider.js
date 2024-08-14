import { useState, useEffect, createContext, useContext } from "react";
import axios from "../axios.js";
import { useNavigate } from "react-router";

const Auth = createContext();

export default function AuthProvider({children}) {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

    const navigate = useNavigate();
    useEffect(() => {
        if (!email) {
          LogOut();
        }
      }, [email]);

    function updAuthState(data) {
        const {username, email, userId} = data;

        setUsername(username)
        setEmail(email)
        setUserId(userId)

        localStorage.setItem('username', username)
        localStorage.setItem('email', email)
        localStorage.setItem('userId', userId)
    }

    async function SignUp(data) {
        try {
            const response = await axios.post('/auth/signup', data)
            console.log(response);
            updAuthState({
                username: response.data.user.username,
                email: response.data.user.email,
                userId: response.data.user.id
            })
            console.log(response.data.user.id)
            navigate('/')
        } catch(error) {
            localStorage.setItem('signupErr', error.response.data)
        }
    }
    async function Login(data) {
        try {
            const response = await axios.post('/auth/login', data);
            updAuthState({
                username: response.data.user.username,
                email: response.data.user.email,
                userId: response.data.user._id
            });
            navigate('/')
            } catch (error) {
                localStorage.setItem('loginErr', error.response.data)
            }
    };
    function LogOut() {
        updAuthState({
            username: '',
            email: '',
            userId: ''
        })
        navigate('/auth')
    }
    return (
        <Auth.Provider value={{username, email, userId, Login, SignUp, LogOut}}>
            {children}
        </Auth.Provider>  
    )
}

export const useAuth = () => {
    return useContext(Auth)
}