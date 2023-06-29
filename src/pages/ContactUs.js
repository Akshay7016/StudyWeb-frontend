import React from 'react';
import { BsFillChatRightTextFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { MdCall } from "react-icons/md";

import Reviews from "../components/common/Reviews";
import ContactForm from '../components/common/ContactForm';
import Footer from "../components/common/Footer";

const ContactUs = () => {
    return (
        <div>
            {/* Contact section */}
            <div className='w-11/12 max-w-maxContent mx-auto mt-[40px] md:mt-[80px] mb-[100px] flex flex-col md:flex-row gap-7 md:gap-0 justify-between'>
                <div className='w-full md:w-[38%] h-max flex flex-col gap-12 p-9 bg-richblack-800 rounded-2xl'>
                    {/* Chat with us */}
                    <div>
                        <div className='flex items-center gap-3 mb-1'>
                            <BsFillChatRightTextFill className='text-richblack-300 text-[23px]' />
                            <div className='text-[18px] font-semibold text-richblack-50'>
                                Chat with us
                            </div>
                        </div>

                        <p className='text-[14px] font-semibold text-richblack-300'>
                            Our friendly team is here to help.
                        </p>

                        <p className='text-[14px] font-semibold text-richblack-300'>
                            studyweb.contact@gmail.com
                        </p>
                    </div>

                    {/* Visit us */}
                    <div>
                        <div className='flex items-center gap-3 mb-1'>
                            <GiEarthAmerica className='text-richblack-300 text-[23px]' />
                            <div className='text-[18px] font-semibold text-richblack-50'>
                                Visit us
                            </div>
                        </div>

                        <p className='text-[14px] font-semibold text-richblack-300'>
                            Come and say hello at our office HQ.
                        </p>

                        <p className='text-[14px] font-semibold text-richblack-300'>
                            Pimpalgaon Baswant, District - Nashik, Taluka - Niphad
                        </p>

                        <p className='text-[13px] font-semibold text-richblack-300'>
                            Nashik, Maharashtra - 422209
                        </p>
                    </div>

                    {/* Call us */}
                    <div>
                        <div className='flex items-center gap-3 mb-1'>
                            <MdCall className='text-richblack-300 text-[23px]' />
                            <div className='text-[18px] font-semibold text-richblack-50'>
                                Call us
                            </div>
                        </div>

                        <p className='text-[14px] font-semibold text-richblack-300'>
                            Mon - Fri From 8am to 5pm
                        </p>

                        <p className='text-[14px] font-semibold text-richblack-300'>
                            +91 12345 67890
                        </p>
                    </div>
                </div>

                <div className='w-full md:w-[56%] p-9 md:p-12 bg-richblack-900 rounded-2xl border-[1px] border-richblack-600'>
                    <div className='text-4xl font-bold text-richblack-25 mb-[2px]'>
                        Got a Idea? We've got the skills.
                    </div>

                    <div className='text-4xl font-bold text-richblack-25 mb-3'>
                        Let's team up
                    </div>

                    <p className='text-[17px] text-richblack-400 mb-10'>
                        Tell us more about yourself and what you're got in mind.
                    </p>

                    <ContactForm />
                </div>
            </div>

            {/* Reviews section */}
            <Reviews />

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default ContactUs