import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export default function PrivateRoutes() {
    const { expiry, token } = useAuth();

    if (!token || isTokenExpired(expiry)) {
        return <Navigate to = "/auth" replace = 'true'/>
    }
    return <Outlet/>
}
function isTokenExpired(exp) {
    if (!exp) {
        return true
    }
    
    const now = Date.now() / 1000;
    return now > exp;
}