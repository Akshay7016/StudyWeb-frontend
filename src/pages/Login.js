import { useSelector } from "react-redux";

import Template from "../components/core/auth/Template";
import loginImg from '../assets/Images/login.webp';
import Spinner from "../components/common/Spinner";


const Login = () => {
    const { loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Spinner />
    };

    return (
        <Template
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            image={loginImg}
            formType="login"
        />
    )
};

export default Login;