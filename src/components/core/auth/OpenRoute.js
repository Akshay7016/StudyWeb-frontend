// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
    const { user } = useSelector((state) => state.profile)

    return user ? <Navigate to="/dashboard/my-profile" /> : children;
};

export default OpenRoute;