import React, { useState } from 'react';

import HighlightText from './HighlightText';
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };

    return (
        <div className='w-full mt-20'>
            <div className='text-4xl font-semibold text-center'>
                Unlock the <HighlightText text="Power of Code" />
            </div>

            <div className='mt-[8px] text-richblack-300 text-center font-semibold'>
                Learn to Build Anything You Can Imagine
            </div>

            <div className='w-fit mx-auto mt-5 mb-[50px] flex items-center gap-6 bg-richblack-800 rounded-full p-1 shadow-[0_1px_1px_rgba(255,255,255,0.4)]'>
                {
                    tabsName.map((tab, index) => {
                        return (
                            <div
                                key={index}
                                className={`
                                    ${currentTab === tab ? "bg-richblack-900 text-richblack-5" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 py-2 px-7
                                `}
                                onClick={() => setMyCards(tab)}
                            >
                                {tab}
                            </div>
                        )
                    })
                }
            </div>

            <div className='w-full flex items-center justify-between'>
                {
                    courses.map((course, index) => {
                        return (
                            <CourseCard
                                key={index}
                                course={course}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMore