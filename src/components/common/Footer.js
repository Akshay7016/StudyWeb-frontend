import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { FooterLink2 } from '../../data/footer-links';

import Logo from "../../assets/Logo/logo.png";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {

    return (
        <div className='bg-richblack-800'>
            <div className='w-[85%] lg:w-11/12 mx-auto flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between items-start text-richblack-400 pt-14 pb-5 border-b-[1px] border-richblack-700'>
                {/* Left container */}
                <div className='lg:w-[50%] flex flex-row flex-wrap gap-14'>
                    {/* section 1 */}
                    <div className='flex flex-col gap-4'>
                        {/* Logo */}
                        <img src={Logo} alt="logo" className='w-[166px]' />

                        {/* company */}
                        <div className='flex flex-col gap-[10px]'>
                            <div className='font-semibold text-richblack-100'>
                                Company
                            </div>

                            <div className='flex flex-col gap-2'>
                                {
                                    ["About", "Careers", "Affiliates"].map((element, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* social media icons */}
                        <div className='flex items-center gap-3'>
                            <FaFacebook />
                            <FaGoogle />
                            <FaTwitter />
                            <FaYoutube />
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className='flex flex-col gap-8'>
                        {/* Resources */}
                        <div className='flex flex-col gap-[10px]'>
                            <div className='font-semibold text-richblack-100'>
                                Resources
                            </div>

                            <div className='flex flex-col gap-2'>
                                {
                                    Resources.map((element, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* Support */}
                        <div className='flex flex-col gap-[10px]'>
                            <div className='font-semibold text-richblack-100'>
                                Support
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div
                                    className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                >
                                    <Link to="help-center">Help Center</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className='flex flex-col gap-8'>
                        {/* Plans */}
                        <div className='flex flex-col gap-[10px]'>
                            <div className='font-semibold text-richblack-100'>
                                Plans
                            </div>

                            <div className='flex flex-col gap-2'>
                                {
                                    Plans.map((element, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* Community */}
                        <div className='flex flex-col gap-[10px]'>
                            <div className='font-semibold text-richblack-100'>
                                Community
                            </div>

                            <div className='flex flex-col gap-2'>
                                {
                                    Community.map((element, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right container */}
                <div className='lg:w-[50%] lg:pl-[40px] lg:pb-[20px] flex flex-row flex-wrap  gap-9 lg:gap-14 lg:border-l-[1px] border-richblack-700'>
                    {/* Section 1 - Subjects */}
                    <div className='flex flex-col gap-[10px]'>
                        <div className='font-semibold text-richblack-100'>
                            Subjects
                        </div>

                        <div className='flex flex-col gap-2'>
                            {
                                FooterLink2[0].links.map(({ title, link }, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        >
                                            <Link to={link}>{title}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Section 2 - Languages */}
                    <div className='flex flex-col gap-[10px]'>
                        <div className='font-semibold text-richblack-100'>
                            Languages
                        </div>

                        <div className='flex flex-col gap-2'>
                            {
                                FooterLink2[1].links.map(({ title, link }, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        >
                                            <Link to={link}>{title}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Section 3 - Career building */}
                    <div className='flex flex-col gap-[10px]'>
                        <div className='font-semibold text-richblack-100'>
                            Career building
                        </div>

                        <div className='flex flex-col gap-2'>
                            {
                                FooterLink2[2].links.map(({ title, link }, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-[14px] font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        >
                                            <Link to={link}>{title}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-11/12 mx-auto flex flex-col gap-2 lg:gap-0 lg:flex-row items-center justify-between my-8 lg:my-12'>
                <div className='flex flex-row'>
                    {
                        BottomFooter.map((element, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-[13px] px-4 font-normal text-richblack-400 cursor-pointer hover:text-richblack-50 transition-all duration-200 border-r-[1px] border-richblack-700 last:border-none"
                                >
                                    <Link to={element.toLowerCase()}>{element}</Link>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex items-center gap-1 text-[13px] font-normal text-richblack-400">
                    Made with <AiFillHeart className='text-[15px] text-[#FF0000]' /> by Akshay &copy; 2023 StudyWeb
                </div>
            </div>
        </div>
    )
}

export default Footer;