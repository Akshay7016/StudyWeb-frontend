import Template from '../components/core/auth/Template';
import signupImage from '../assets/Images/signup.webp';

const Signup = () => {
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