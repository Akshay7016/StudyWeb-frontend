import React from 'react';

import HighlightText from "../components/core/homepage/HighlightText";
import Quote from '../components/core/aboutPage/Quote';
import LearningGrid from '../components/core/aboutPage/LearningGrid';
import ContactFormSection from '../components/core/aboutPage/ContactFormSection';

import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";

const About = () => {
    return (
        <div>
            {/* Section 1 */}
            <section className='w-full bg-richblack-700'>
                <div className='relative w-11/12 max-w-maxContent mx-auto pt-[30px] md:pt-[40px] lg:pt-[50px] pb-[125px] md:pb-[185px] lg:pb-[250px]'>
                    <h1 className='w-full md:w-[70%] mx-auto text-[28px] md:text-[34px] leading-[40px] text-white text-center font-bold'>
                        Driving Innovation in Online Education for a <HighlightText text="Brighter Future" />
                    </h1>

                    <p className='w-full md:w-[65%] mt-5 md:mt-3 mx-auto text-center text-base text-richblack-300 font-medium'>
                        StudyWeb is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>

                    <div className='absolute ,d:top-[250px] lg:top-[220px] w-full mt-[30px] md:mt-[45px] flex flex-row justify-between items-center'>
                        <img
                            src={BannerImage1}
                            alt="banner"
                            loading='lazy'
                            className='w-[46%] md:w-[31%]'
                        />

                        <img
                            src={BannerImage2}
                            alt="banner"
                            loading='lazy'
                            className='w-[46%] md:w-[31%]'
                        />

                        <img
                            src={BannerImage3}
                            alt="banner"
                            loading='lazy'
                            className='w-[46%] md:w-[31%] hidden md:block'
                        />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className='bg-richblack-900'>
                <div className='mt-[120px] md:mt-[180px] pb-[80px] border-b-[1px] border-richblack-700'>
                    <Quote />
                </div>
            </section>

            {/* Section 3 */}
            <section className='w-11/12 max-w-maxContent mx-auto text-white'>
                {/* sub section 1 */}
                <div className='mt-[80px] flex gap-16 md:gap-0 flex-col md:flex-row justify-between items-center'>
                    <div className='w-[90%] md:w-[45%] flex flex-col gap-6'>
                        <h1 className='text-[34px] font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent'>
                            Our Founding Story
                        </h1>

                        <p className='text-richblack-300 leading-[21px]'>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>

                        <p className='text-richblack-300 leading-[21px]'>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>

                    <div className='w-[90%] md:w-[40%]'>
                        <img
                            src={FoundingStory}
                            alt="Founding story"
                            className='shadow-[0_0_20px_0] shadow-[#FC6767]'
                        />
                    </div>
                </div>

                {/* sub section 2 */}
                <div className='mt-[80px] md:mt-[120px] mb-[70px] md:mb-[90px] flex flex-col md:flex-row gap-12 md:gap-0 justify-between items-center md:items-start'>
                    <div className='w-[90%] md:w-[35%] flex flex-col gap-7'>
                        <h1 className='text-center md:text-left text-[34px] font-semibold bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent'>
                            Our Vision
                        </h1>

                        <p className='text-richblack-300 leading-[21px]'>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    <div className='w-[90%] md:w-[35%] flex flex-col gap-7'>
                        <h1 className='text-center md:text-left text-[34px] font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>
                            Our Mission
                        </h1>

                        <p className='text-richblack-300 leading-[21px]'>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4 */}
            <section className='bg-richblack-700 py-10'>
                <div className='max-w-maxContent mx-auto flex justify-around px-3 md:px-0'>
                    <div className='flex flex-col items-center'>
                        <div className='text-white text-2xl md:text-3xl font-semibold md:font-bold'>5K</div>
                        <p className='text-richblack-400 font-semibold'>Students</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='text-white text-2xl md:text-3xl font-semibold md:font-bold'>10+</div>
                        <p className='text-richblack-400 font-semibold'>Mentors</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='text-white text-2xl md:text-3xl font-semibold md:font-bold'>200+</div>
                        <p className='text-richblack-400 font-semibold'>Courses</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='text-white text-2xl md:text-3xl font-semibold md:font-bold'>50+</div>
                        <p className='text-richblack-400 font-semibold'>Awards</p>
                    </div>
                </div>
            </section>

            {/* Section 5 */}
            <section>
                <LearningGrid />
                <ContactFormSection />
            </section>
        </div>
    )
}

export default About