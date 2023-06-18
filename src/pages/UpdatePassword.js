import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { RxArrowLeft } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import Spinner from '../components/common/Spinner';
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const { errors } = formState;

    const submitHandler = (data) => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const token = location.pathname.split("/").at(-1);

        dispatch(resetPassword(token, password, confirmPassword, navigate));

        reset();
    };

    if (loading) {
        return <Spinner />
    };

    return (
        <div className='w-full h-[calc(100vh-56px)] flex justify-center items-center'>
            <div className='max-w-[480px] p-5 md:p-8'>
                <h1 className='text-[26px] font-bold text-richblack-5'>
                    Choose  new password
                </h1>

                <p className={`mt-3 mb-4 text-[18px] leading-6 text-richblack-100`}>
                    Almost done. Enter your new password and you're all set.
                </p>

                <form
                    onSubmit={handleSubmit(submitHandler)}
                    noValidate
                    className='flex flex-col gap-4'
                >
                    {/* New Password */}
                    <label className='w-full relative'>
                        <p className='text-[14px] text-richblack-25 mb-1'>
                            New password<sup className='ml-1 text-pink-200'>*</sup>
                        </p>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs'>{errors?.password?.message}</p>

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-[38px] cursor-pointer'>
                            {
                                showPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            }
                        </span>
                    </label>

                    {/* Confirm new password */}
                    <label className='w-full relative'>
                        <p className='text-[14px] text-richblack-25 mb-1'>
                            Confirm new password<sup className='ml-1 text-pink-200'>*</sup>
                        </p>

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            {...register("confirmPassword", {
                                required: "Confirm password is required"
                            })}
                            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs'>{errors?.confirmPassword?.message}</p>

                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className='absolute right-3 top-[38px] cursor-pointer'>
                            {
                                showConfirmPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            }
                        </span>
                    </label>

                    <button className='mt-7 bg-yellow-50 rounded-lg font-medium text-richblack-900 px-3 py-2'>
                        Reset Password
                    </button>
                </form>

                <div className="mt-4">
                    <Link to="/login">
                        <div className='flex gap-2 items-center text-richblack-5'>
                            <RxArrowLeft />
                            Back to Login
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword