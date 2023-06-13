import React from 'react'

import LoginForm from './LoginForm';

import frameImage from '../../../assets/Images/frame.png';

const Template = ({ title, desc1, desc2, image, formType }) => {
    return (
        <div className='w-11/12 mx-auto pt-9 pb-6 flex justify-between'>
            {/* Left container */}
            <div className='w-[38%]'>
                <h1 className='text-richblack-5 font-semibold text-[28px]'>
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

                <LoginForm />
            </div>

            <div className='relative w-[38%]'>
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