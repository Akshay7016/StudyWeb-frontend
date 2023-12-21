import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiArrowDownSLine } from 'react-icons/ri';
import { CgProfile } from "react-icons/cg";

import ProfileDropdown from 'components/core/auth/ProfileDropdown';
import { fetchCourseCategories } from "services/operations/courseDetailsAPI"
import { NavbarLinks } from "data/navbar-links";
import { ACCOUNT_TYPE } from 'enums';
import { setIsOpen } from 'redux/slices/mobileViewSlice';
import Logo from "assets/Logo/logo.png"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCatalogs = async () => {
        setLoading(true);
        const result = await fetchCourseCategories();
        setCatalogs(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchCatalogs();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    };

    const mobileScreenHandler = () => {
        if (!location.pathname.includes("/dashboard")) {
            navigate("/dashboard/my-profile");
        }
        dispatch(setIsOpen(true));
    };

    return (
        <div className={`h-14 flex items-center border-b-[1px] border-richblack-700 ${location.pathname !== "/" && "bg-richblack-800"}`}>
            <div className='w-11/12 max-w-maxContent relative mx-auto flex justify-between items-center'>
                {/* show profile icon for mobile screens */}
                {
                    user && (
                        <div
                            onClick={mobileScreenHandler}
                            className='flex md:hidden text-white cursor-pointer'>
                            <CgProfile size={28} />
                        </div>
                    )
                }
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

                                                    <div className='invisible py-5 px-4 absolute md:-left-[85px] md:top-[40px] lg:-left-[100px] lg:top-[40px] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 md:w-[250px] lg:w-[270px] z-[120]'>

                                                        <div className='absolute md:-top-[10px] md:left-[140px] lg:-top-[10px] lg:left-[155px] w-6 h-6 rotate-45 rounded bg-richblack-5 invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                                                        </div>

                                                        {
                                                            loading ? (<div className='text-center'>Loading...</div>) :
                                                                !!catalogs.length ? (
                                                                    catalogs.map((catalog) => {
                                                                        const { _id, name } = catalog;

                                                                        return (
                                                                            <div
                                                                                key={_id}
                                                                                className='px-2 py-3 rounded-md hover:bg-richblack-50'
                                                                                onClick={() => navigate(`/catalog/${name.toLowerCase().replaceAll(" ", "-")}`, { state: { categoryId: _id } })}
                                                                            >
                                                                                {name}
                                                                            </div>
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
                        user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && user.accountType !== ACCOUNT_TYPE.ADMIN && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-2xl text-richblack-100' />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -top-[6px] -right-[10px] w-[17px] h-[17px] flex justify-center items-center rounded-full bg-yellow-100 text-black font-semibold text-[13px]'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        user === null && (
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
                        user !== null && <ProfileDropdown />
                    }
                </div>

                {/* for mobile screens show catalog */}
                <div className='flex md:hidden relative cursor-pointer items-center group'>
                    <div className='text-richblack-25'>Catalog</div>
                    <RiArrowDownSLine className='text-richblack-25' fontSize="22px" />

                    <div className='invisible py-5 px-4 absolute top-[40px] right-0 flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[280px] z-[120]'>

                        <div className='absolute -top-[9px] right-[4px] w-6 h-6 rotate-45 rounded bg-richblack-5 invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                        </div>

                        {
                            catalogs.length ? (
                                catalogs.map((catalog) => {
                                    const { _id, name } = catalog;

                                    return (
                                        <div
                                            key={_id}
                                            className='px-2 py-3 rounded-md hover:bg-richblack-50'
                                            onClick={() => navigate(`/catalog/${name.toLowerCase().replaceAll(" ", "-")}`, { state: { categoryId: _id } })}
                                        >
                                            {name}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='text-center'>No catalogs found</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;