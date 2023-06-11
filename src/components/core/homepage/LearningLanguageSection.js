import React from 'react';

import HighlightText from "./HighlightText";
import Button from './Button';

import know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
    return (
        <div className='mt-[155px] lg:mt-[200px] mb-[70px] flex flex-col items-center gap-7 lg:gap-3'>
            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for <HighlightText text="learning any language" />
            </div>

            <div className='lg:w-[75%] mx-auto text-base text-center text-richblack-600 '>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='w-full flex flex-col lg:flex-row items-center justify-center'>
                <img
                    src={know_your_progress}
                    alt="know_your_progress"
                    className='h-[400px] lg:-mr-32'
                />
                <img
                    src={compare_with_others}
                    alt="compare_with_others"
                    className='h-[500px] -mt-[150px] -mb-[200px] md:-mt-14 md:-mb-20 lg:my-0'
                />

                <img
                    src={plan_your_lesson}
                    alt="plan_your_lesson"
                    className='h-[450px] lg:-ml-36'
                />
            </div>

            <div className='-mt-[60px] md:-mt-[30px] lg:mt-0'>
                <Button active={true} linkTo="/signup">
                    <div className='font-semibold'>
                        Learn More
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default LearningLanguageSection