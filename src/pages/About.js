import React from 'react';

import HighlightText from "../components/core/homepage/HighlightText";

import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";

const About = () => {
    return (
        <div>
            {/* Section 1 */}
            <section className='w-full h-[calc(100vh-56px)] bg-richblack-700'>
                <div className='w-11/12 mx-auto relative'>
                    <h1 className='w-full md:w-[70%] pt-[30px] md:pt-[50px] lg:pt-[60px] mx-auto text-[28px] md:text-[34px] leading-[40px] text-white text-center font-bold'>
                        Driving Innovation in Online Education for a <HighlightText text="Brighter Future" />
                    </h1>

                    <p className='w-full md:w-[65%] mt-5 md:mt-3 mx-auto text-center text-base text-richblack-300 font-medium'>
                        StudyWeb is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>

                    <div className='w-full mt-[50px] flex gap-6 md:gap-2 lg:gap-5 flex-row flex-wrap justify-center items-center'>
                        <img
                            src={BannerImage1}
                            alt="banner"
                            className='w-[46%] md:w-[32%]'
                        />

                        <img
                            src={BannerImage2}
                            alt="banner"
                            className='w-[46%] md:w-[32%]' />

                        <img
                            src={BannerImage3}
                            alt="banner"
                            className='w-[45%] md:w-[32%]' />
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