import React from 'react'

import { HiUsers } from 'react-icons/hi';
import { ImTree } from 'react-icons/im';

const CourseCard = ({ course, currentCard, setCurrentCard }) => {
    const { heading, description, level, lessonNumber } = course;

    return (
        <div className='relative w-[330px] h-[280px]'>

            {
                currentCard === heading &&
                <div className='w-full h-full absolute z-[5] top-3 left-3 bg-yellow-50'></div>
            }

            <div
                className={`w-full h-full relative z-[10] cursor-pointer ${currentCard === heading ? "bg-white" : "bg-richblack-800"}`}
                onClick={() => setCurrentCard(heading)}
            >
                <div className='flex flex-col gap-3 p-6 h-[80%] border-b-2 border-dashed border-richblack-400'>
                    <div className={`font-semibold text-[20px] font-inter ${currentCard === heading ? "text-richblack-600" : "text-richblack-25"}`}>
                        {heading}
                    </div>

                    <div className='font-normal text-richblack-300'>
                        {description}
                    </div>
                </div>

                <div className={`h-[20%] px-5 flex justify-between ${currentCard === heading ? "text-blue-300" : "text-richblack-300"}`}>
                    <div className='flex gap-2 items-center'>
                        <HiUsers />
                        {level}
                    </div>

                    <div className='flex gap-2 items-center'>
                        <ImTree />
                        {lessonNumber} Lesson
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;