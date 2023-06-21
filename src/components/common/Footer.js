import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom';

const menuLinks = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Menu",
        path: "/menu"
    },
    {
        title: "Service",
        path: "/service"
    },
    {
        title: "Contact",
        path: "/contact"
    }
];

const serviceLinks = [
    {
        title: "Web Design",
        path: "/web-design"
    },
    {
        title: "Web Development",
        path: "/web-development"
    },
    {
        title: "Marketing",
        path: "/marketing"
    },
    {
        title: "Product Management",
        path: "/product-management"
    },
    {
        title: "Graphic Design",
        path: "/graphic-design"
    }
];

const informationLinks = [
    {
        title: "About Us",
        path: "/about"
    },
    {
        title: "Delivery Information",
        path: "/delivery-information"
    },
    {
        title: "Privacy Policy",
        path: "/privacy-policy"
    },
    {
        title: "Terms & Conditions",
        path: "/terms-and-conditions"
    }
];

const Footer = () => {
    return (
        <div className='bg-richblack-800'>
            <div className='w-[80%] max-w-maxContent mx-auto flex flex-col gap-5 md:gap-0 md:flex-row flex-wrap justify-between text-richblack-400 pt-6 md:pt-14 pb-5'>
                {/* Menu links */}
                <div className='flex flex-col'>
                    <div className='text-richblack-50 font-semibold mb-[2px]'>Menu Links</div>
                    <div className='w-10 h-[1.8px] bg-[#FC6600] mb-2'></div>
                    <div className='flex flex-col gap-1'>
                        {
                            menuLinks.map((element, index) => {
                                const { title, path } = element;

                                return (
                                    <Link key={index} to={path}>
                                        <div className='transition-all duration-200 hover:text-richblack-100 hover:-translate-x-3'>{title}</div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Our Service */}
                <div className='flex flex-col'>
                    <div className='text-richblack-50 font-semibold mb-[2px]'>Our Service</div>
                    <div className='w-10 h-[1.8px] bg-[#FC6600] mb-2'></div>
                    <div className='flex flex-col gap-1'>
                        {
                            serviceLinks.map((element, index) => {
                                const { title, path } = element;

                                return (
                                    <Link key={index} to={path}>
                                        <div className='transition-all duration-200 hover:text-richblack-100 hover:-translate-x-3'>{title}</div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Information */}
                <div className='flex flex-col'>
                    <div className='text-richblack-50 font-semibold mb-[2px]'>Information</div>
                    <div className='w-10 h-[1.8px] bg-[#FC6600] mb-2'></div>
                    <div className='flex flex-col gap-1'>
                        {
                            informationLinks.map((element, index) => {
                                const { title, path } = element;

                                return (
                                    <Link key={index} to={path}>
                                        <div className='transition-all duration-200 hover:text-richblack-100 hover:-translate-x-3'>{title}</div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Logos */}
                <div className='flex flex-col'>
                    <div className='text-richblack-50 font-semibold mb-[2px]'>Contact Us</div>
                    <div className='w-10 h-[1.8px] bg-[#FC6600] mb-2'></div>
                    <div className='flex flex-row gap-3'>
                        <FaFacebook className='cursor-pointer text-[25px] hover:text-[#FC6600]' />
                        <FaGoogle className='cursor-pointer text-[25px] hover:text-[#FC6600]' />
                        <FaTwitter className='cursor-pointer text-[25px] hover:text-[#FC6600]' />
                        <FaYoutube className='cursor-pointer text-[25px] hover:text-[#FC6600]' />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-maxContent mx-auto mb-5 mt-5 flex justify-center items-center text-[13px] font-normal text-richblack-400">
                Made with<AiFillHeart className='mx-1 text-[15px] text-[#FF0000]' /> by Akshay &copy; 2023 StudyWeb
            </div>
        </div>
    )
}

export default Footer;