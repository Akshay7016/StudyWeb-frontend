import React from 'react';

import ButtonLink from 'components/common/ButtonLink';

import HighlightText from '../homepage/HighlightText';

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "StudyWeb partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "StudyWeb partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "StudyWeb partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "StudyWeb partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "StudyWeb partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
    return (
        <div className='w-11/12 max-w-maxContent mx-auto my-[60px] md:my-[100px] grid grid-cols-1 lg:grid-cols-4'>
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div
                            key={index}
                            className={`
                                ${index === 0 && "h-fit lg:col-span-2 bg-richblack-900"}
                                ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                                ${card.order === 3 && "lg:col-start-2"}
                                h-[280px] mx-auto w-[90%] md:w-[50%] lg:w-full
                        `}
                        >
                            {
                                card.order < 0 ? (
                                    <div className='w-[90%] flex flex-col gap-4 text-white'>
                                        <div className='text-4xl font-semibold'>
                                            {card.heading}
                                            {" "}
                                            <HighlightText text={card.highlightText} />
                                        </div>

                                        <p className='text-richblack-300 font-medium'>
                                            {card.description}
                                        </p>

                                        <div className='w-fit mt-3 mb-8 lg:mb-0'>
                                            <ButtonLink active={true} linkTo={card.BtnLink}>
                                                <div className='font-semibold'>
                                                    {card.BtnText}
                                                </div>
                                            </ButtonLink>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-8 p-8'>
                                        <div className='text-lg text-richblack-5'>
                                            {card.heading}
                                        </div>

                                        <p className='text-richblack-300'>
                                            {card.description}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LearningGrid