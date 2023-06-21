import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';

import HighlightText from '../components/core/homepage/HighlightText';
import Button from '../components/core/homepage/Button';
import CodeBlocks from '../components/core/homepage/CodeBlocks';
import TimelineSection from '../components/core/homepage/TimelineSection';
import LearningLanguageSection from '../components/core/homepage/LearningLanguageSection';
import InstructorSection from '../components/core/homepage/InstructorSection';
import ExploreMore from '../components/core/homepage/ExploreMore';
import Footer from '../components/common/Footer';

import Banner from '../assets/Images/banner.mp4';

const Home = () => {
    return (
        <>
            {/* Section 1 */}
            <div className='mt-10 w-11/12 max-w-maxContent mx-auto flex flex-col items-center text-white'>
                <Link to="/signup">
                    <div className='group rounded-full bg-richblack-800 font-medium text-richblack-200 transition-all duration-200 hover:scale-95 py-[10px] px-[22px] shadow-[0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-none hover:bg-richblack-900 hover:outline outline-richblack-700'>
                        <div className='flex items-center gap-3'>
                            Become an Instructor
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='mt-[38px] w-[90%] mx-auto text-center font-semibold text-4xl'>
                    Empower Your Future with <HighlightText text="Coding Skills" />
                </div>

                <div className='mt-4 w-[75%]- mx-auto text-center text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex gap-6 mt-[38px]'>
                    <Button active={true} linkTo="/signup">
                        Learn More
                    </Button>

                    <Button linkTo="/login">
                        Book a Demo
                    </Button>
                </div>

                <div className='mt-12 mb-[80px] lg:mb-[140px] w-[97%] relative shadow-[-5px_-5px_40px_10px_#073B4C]'>
                    <video autoPlay muted loop className='relative z-20'>
                        <source src={Banner} type="video/mp4" />
                    </video>

                    <div className='w-full h-full absolute top-4 left-4 z-10 bg-white'>
                    </div>
                </div>

                <div className='flex flex-col gap-1 lg:gap-28'>
                    {/* Code block 1 */}
                    <CodeBlocks
                        flexDirection={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold text-center lg:text-start'>
                                Unlock your <HighlightText text="coding potential" /> with our online courses.
                            </div>
                        }
                        subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        ctabtn1="Try it Yourself"
                        ctabtn2="Learn More"
                        codeLines={`<!DOCTYPE html> \n <html lang="en"> \n <head> \n <title>This is myPage</title> \n </head> \n <body> \n <nav> \n <a href="/one>One</a> <a href="/two>Two</a> \n </nav> \n </body> \n </html>`}
                        codeColor="text-yellow-25"
                    />

                    {/* Code block 2 */}
                    <CodeBlocks
                        flexDirection={"lg:flex-row-reverse"}
                        heading={
                            <div className='lg:w-[50%] text-4xl font-semibold text-center lg:text-start'>
                                Start <HighlightText text="coding in seconds" />
                            </div>
                        }
                        subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        ctabtn1="Continue Lesson"
                        ctabtn2="Learn More"
                        codeLines={`import React, {useState} from 'react'; \n import Button from './Button'; \n import {toast} from 'react-toastify'; \n import {FaArrowRight} from 'react-icons/fa'; \n  \n const Home = () => { \n return ( \n <div>Home</div> \n ) \n }; \n export default Home;`}
                        codeColor="text-caribbeangreen-5"
                    />
                </div>

                <ExploreMore />

            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[200px] lg:h-[318px]'>
                    <div className='w-11/12 h-full mx-auto max-w-maxContent flex justify-center'>
                        <div className='mt-[70px] lg:mt-[200px] flex gap-6'>
                            <Button active={true} linkTo="/signup">
                                <div className='flex gap-2 items-center'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </Button>

                            <Button linkTo="/signup">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='w-11/12 max-w-maxContent mx-auto mt-[40px] lg:mt-[90px] flex flex-col'>
                    <div className='flex flex-col gap-6 lg:flex-row lg:gap-0 justify-between mb-[90px]'>
                        <div className='lg:w-[50%] text-4xl font-semibold text-center lg:text-start'>
                            Get the skills you need for a {" "}
                            <HighlightText text="job that is in demand." />
                        </div>

                        <div className='lg:w-[42%] flex flex-col items-center lg:items-start gap-12'>
                            <div>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>

                            <Button active={true} linkTo="/signup">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <TimelineSection />

                    <LearningLanguageSection />
                </div>
            </div>

            {/* Section 3 */}
            <div className='w-11/12 max-w-maxContent mx-auto'>
                <InstructorSection />

                <div className='mb-[100px] text-4xl text-white text-center font-semibold'>
                    Reviews from other learners
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    )
}

export default Home