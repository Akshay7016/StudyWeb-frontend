import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ACCOUNT_TYPE } from "enums";

const InstructorRoute = ({ children }) => {
    const { user } = useSelector((state) => state.profile);

    return user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? children : <Navigate to="/dashboard/my-profile" />
};

export default InstructorRoute;