import { Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export default function PrivateRoutes() {
    const { email } = useAuth();
    return email ? <Outlet/> : ''
}