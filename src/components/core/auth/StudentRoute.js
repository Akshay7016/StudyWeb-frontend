import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ACCOUNT_TYPE } from "../../../enums";

const StudentRoute = ({ children }) => {
    const { user } = useSelector((state) => state.profile);

    return user?.accountType === ACCOUNT_TYPE.STUDENT ? children : <Navigate to="/dashboard/my-profile" />
};

export default StudentRoute;