import React from 'react';

import HighlightText from "../components/core/homepage/HighlightText";

import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";

const About = () => {
    return (
        <div>
            {/* Section 1 */}
            <section className='w-full bg-richblack-700'>
                <div className='w-11/12 mx-auto pt-[30px] md:pt-[40px] lg:pt-[50px] pb-[20px] md:pb-[30px]'>
                    <h1 className='w-full md:w-[70%] mx-auto text-[28px] md:text-[34px] leading-[40px] text-white text-center font-bold'>
                        Driving Innovation in Online Education for a <HighlightText text="Brighter Future" />
                    </h1>

                    <p className='w-full md:w-[65%] mt-5 md:mt-3 mx-auto text-center text-base text-richblack-300 font-medium'>
                        StudyWeb is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>

                    <div className='w-full mt-[30px] md:mt-[45px] flex gap-5 md:gap-0 flex-row flex-wrap md:flex-nowrap justify-center md:justify-between items-center'>
                        <img
                            src={BannerImage1}
                            alt="banner"
                            loading='lazy'
                            className='w-[46%] md:w-[32%]'
                        />

                        <img
                            src={BannerImage2}
                            alt="banner"
                            loading='lazy'
                            className='w-[46%] md:w-[32%]' />

                        <img
                            src={BannerImage3}
                            alt="banner"
                            loading='lazy'
                            className='w-[46%] md:w-[32%]' />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className='w-full h-[500px] bg-richblack-900'>

            </section>
        </div>
    )
}

export default About