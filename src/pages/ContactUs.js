import React from 'react';
import { BsFillChatRightTextFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { MdCall } from "react-icons/md";

const ContactUs = () => {
    return (
        <div>
            <div className='w-11/12 max-w-maxContent mx-auto mt-[90px] flex '>
                <div className='w-[40%] flex flex-col gap-12 p-9 bg-richblack-800 rounded-2xl'>
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
                            Near City Center Mall, College Road,
                        </p>

                        <p className='text-[13px] font-semibold text-richblack-300'>
                            Nashik - 422209
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
            </div>
        </div>
    )
}

export default ContactUs