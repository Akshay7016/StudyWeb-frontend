import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import Instructor from '../../../assets/Images/Instructor.png';
import Button from './Button';
import HighlightText from './HighlightText';

const InstructorSection = () => {
    return (
        <div className='my-[90px] flex items-center justify-between gap-20'>
            <div className='w-[50%] h-[460px] relative border-2'>
                <img
                    src={Instructor}
                    alt="Instructor"
                    className='w-full h-full relative z-[10]'
                />

                <div className='w-full h-full bg-white absolute -top-4 -left-4 z-[5]'></div>
            </div>

            <div className='w-[50%] flex flex-col gap-8 text-white'>
                <div className='w-[40%] text-4xl font-semibold'>
                    Become an <HighlightText text="instructor" />
                </div>

                <div className='w-[90%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>

                <div className='w-fit'>
                    <Button active={true} linkTo="/signup">
                        <div className='flex items-center gap-2'>
                            Start Teaching Today
                            <FaArrowRight />
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection