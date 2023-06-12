import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';

import ProfileDropdown from '../core/auth/ProfileDropdown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { NavbarLinks } from "../../data/navbar-links";
import { mobileNavbarLinks } from '../../data/mobileNavbarLinks';
import { ACCOUNT_TYPE } from '../../enums';
import Logo from "../../assets/Logo/logo.png"

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [catalogs, setCatalogs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchCatalogs = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setCatalogs(result?.data?.data);
        } catch (error) {
            console.log("Could not fetch category list ", error.message);
        }
    };

    useEffect(() => {
        fetchCatalogs();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const navigationHandler = (path) => {
        navigate(path);
        setIsOpen(false);
    }

    return (
        <div className='h-14 flex items-center border-b-[1px] border-richblack-700'>
            <div className='w-11/12 relative mx-auto flex justify-between items-center'>
                {/* Logo */}
                <Link to="/">
                    <img
                        src={Logo}
                        alt="logo"
                        width="160"
                        height="42"
                        loading='lazy'
                    />
                </Link>

                {/* Navbar links */}
                <div className='hidden md:flex lg:flex gap-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) => {
                            const { title, path } = link;

                            return (
                                <div key={index}>
                                    {
                                        title === "Catalog" ?
                                            (
                                                <div className='relative cursor-pointer flex items-center group'>
                                                    <div>{title}</div>
                                                    <RiArrowDownSLine fontSize="22px" />

                                                    <div className='invisible py-5 px-4 absolute md:-left-[85px] md:top-[40px] lg:-left-[100px] lg:top-[40px] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 md:w-[250px] lg:w-[270px]'>

                                                        <div className='absolute md:-top-[10px] md:left-[140px] lg:-top-[10px] lg:left-[155px] w-6 h-6 rotate-45 rounded bg-richblack-5 invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                                                        </div>

                                                        {
                                                            catalogs.length ? (
                                                                catalogs.map((catalog) => {
                                                                    const { _id, name } = catalog;

                                                                    return (
                                                                        <Link key={_id} to={`catalog/${name.toLowerCase().replaceAll(" ", "-")}`}>
                                                                            <div className='px-2 py-3 rounded-md hover:bg-richblack-50'>{name}</div>
                                                                        </Link>
                                                                    );
                                                                })
                                                            ) : (
                                                                <div className='text-center'>No catalogs found</div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ) :
                                            (
                                                <Link to={path}>
                                                    <div className={`${matchRoute(path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {title}
                                                    </div>
                                                </Link>
                                            )
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                {/* login/signup/dashboard */}
                <div className='hidden md:flex lg:flex gap-4 items-center'>
                    {
                        user && user.accountType !== ACCOUNT_TYPE.instructor && user.accountType !== ACCOUNT_TYPE.admin && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <div className='flex gap-4'>
                                <Link to="/login">
                                    <button className='text-[14px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                        Log in
                                    </button>
                                </Link>

                                <Link to="/signup">
                                    <button className='text-[14px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        )
                    }

                    {
                        token !== null && <ProfileDropdown />
                    }
                </div>

                {/* Mobile responsiveness */}
                <div onClick={() => setIsOpen(!isOpen)} className='flex md:hidden lg:hidden'>
                    {
                        isOpen ?
                            <RxCross2 className='text-richblack-50 text-[26px]' /> :
                            <RxHamburgerMenu className='text-richblack-50 text-[26px]' />
                    }
                </div>

                <div className={`w-full absolute top-[44px] py-4 gap-[18px] ${isOpen ? "flex" : "hidden"} bg-richblue-600 text-richblack-25 border-[1px] border-richblue-300 rounded-md flex-col items-center md:hidden lg:hidden`}>
                    {
                        mobileNavbarLinks.map((element, index) => {
                            const { title, path } = element;

                            return (
                                <div onClick={() => navigationHandler(path)} className='font-semibold text-[20px]'>{title}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar;