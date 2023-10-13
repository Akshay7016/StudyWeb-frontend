import React from 'react';

import ButtonLink from 'components/common/ButtonLink';
import know_your_progress from "assets/Images/Know_your_progress.svg";
import compare_with_others from "assets/Images/Compare_with_others.svg";
import plan_your_lesson from "assets/Images/Plan_your_lessons.svg";

import HighlightText from "./HighlightText";

const LearningLanguageSection = () => {
    return (
        <div className='mt-[155px] mb-[40px] lg:mt-[200px] lg:mb-[70px] flex flex-col items-center'>
            <div className='text-4xl font-semibold text-center mb-3'>
                Your swiss knife for <HighlightText text="learning any language" />
            </div>

            <div className='lg:w-[75%] mx-auto text-base text-center text-richblack-600 mb-3'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='w-full flex flex-row flex-wrap items-center justify-center'>
                <img
                    src={know_your_progress}
                    alt="know_your_progress"
                    className='h-[250px] md:h-[400px] lg:-mr-32'
                />
                <img
                    src={compare_with_others}
                    alt="compare_with_others"
                    className='h-[300px] md:h-[500px]'
                />

                <img
                    src={plan_your_lesson}
                    alt="plan_your_lesson"
                    className='h-[300px] md:h-[450px] lg:-ml-36'
                />
            </div>

            <div className='mt-[25px] md:mt-[10px] lg:mt-0'>
                <ButtonLink active={true} linkTo="/signup">
                    <div className='font-semibold'>
                        Learn More
                    </div>
                </ButtonLink>
            </div>
        </div>
    )
}

export default LearningLanguageSection