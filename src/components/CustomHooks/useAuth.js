import { useContext } from "react";
import AuthContext from "../Authenticatio/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth