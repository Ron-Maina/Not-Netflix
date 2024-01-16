import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./CustomHooks/useAuth";

const RequireAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()

    return (
        auth?.accessToken 
            ? <Outlet /> 
            : <Navigate to='/' state={{from: location}} replace />
    )
}

export default RequireAuth