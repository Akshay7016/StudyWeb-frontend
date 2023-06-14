import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import frameImage from '../../../assets/Images/frame.png';

const Template = ({ title, desc1, desc2, image, formType }) => {
    return (
        <div className='w-11/12 mx-auto pt-9 pb-6 lg:flex justify-between'>
            {/* Left container */}
            <div className='w-[90%] mx-auto md:w-[75%] lg:w-[38%] lg:mx-0'>
                <h1 className='text-richblack-5 font-semibold text-[28px] leading-9'>
                    {title}
                </h1>

                <p className='text-[17px] leading-[24px] text-richblack-300 mt-4'>
                    <span className='text-richblack-100'>
                        {desc1}
                    </span>

                    <br />

                    <span className='text-blue-100 font-edu-sa'>
                        {desc2}
                    </span>
                </p>

                {formType === "signup" ?
                    (<SignupForm />) :
                    (<LoginForm />)
                }
            </div>

            <div className='relative w-[38%] hidden md:hidden lg:block'>
                <img
                    src={image}
                    alt="students"
                    loading="lazy"
                    className='w-[100%] relative z-[7]'
                />

                <img
                    src={frameImage}
                    alt="frame"
                    loading="lazy"
                    className='w-[100%] absolute top-4 left-4 z-[5]'
                />
            </div>

        </div>
    )
}

export default Template