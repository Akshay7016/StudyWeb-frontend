import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import Instructor from 'assets/Images/Instructor.png';
import ButtonLink from 'components/common/ButtonLink';

import HighlightText from './HighlightText';

const InstructorSection = () => {
    return (
        <div className='my-[50px] lg:my-[90px] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20'>
            <div className='w-[90%] md:w-[60%] lg:w-[50%] h-[300px] lg:h-[460px] relative border-2'>
                <img
                    src={Instructor}
                    alt="Instructor"
                    className='w-full h-full relative z-[10]'
                />

                <div className='w-full h-full bg-white absolute -top-4 -left-4 z-[5]'></div>
            </div>

            <div className='lg:w-[50%] flex flex-col gap-8 text-white'>
                <div className='lg:w-[75%] text-4xl font-semibold text-center lg:text-start'>
                    Become an <HighlightText text="instructor" />
                </div>

                <div className='lg:w-[90%] text-richblack-300 text-center lg:text-start'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>

                <div className='w-fit mx-auto lg:mx-0'>
                    <ButtonLink active={true} linkTo="/signup">
                        <div className='flex items-center gap-2'>
                            Start Teaching Today
                            <FaArrowRight />
                        </div>
                    </ButtonLink>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection