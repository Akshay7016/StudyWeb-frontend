import { useSelector } from "react-redux";

import Template from 'components/core/auth/Template';
import Spinner from "components/common/Spinner";
import signupImage from 'assets/Images/signup.webp';


const Signup = () => {
    const { loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Spinner />
    };

    return (
        <Template
            title="Join the millions learning to code with StudyWeb for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            image={signupImage}
            formType="signup"
        />
    )
}

export default Signup