import React from 'react';

import HighlightText from "./HighlightText";
import Button from './Button';

import know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
    return (
        <div className='mt-[200px] mb-[70px] flex flex-col items-center gap-3'>
            <div className='text-4xl font-semibold'>
                Your swiss knife for <HighlightText text="learning any language" />
            </div>

            <div className='w-[75%] mx-auto text-base text-center text-richblack-600 '>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='w-full flex items-center justify-center'>
                <img
                    src={know_your_progress}
                    alt="know_your_progress"
                    className='h-[400px] -mr-32'
                />
                <img
                    src={compare_with_others}
                    alt="compare_with_others"
                    className='h-[500px]'
                />

                <img
                    src={plan_your_lesson}
                    alt="plan_your_lesson"
                    className='h-[450px] -ml-36'
                />
            </div>

            <div>
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