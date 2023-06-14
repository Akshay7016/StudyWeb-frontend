import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("Student");
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    const { errors } = formState;

    const submitHandler = (data) => {
        const payload = { ...data, accountType }
        console.log(payload);
        reset();
        navigate("/dashboard");
    }

    return (
        <>
            {/* Student - Instructor toggler */}
            <div className='flex gap-1 p-1 bg-richblack-800 my-6 rounded-full w-max border-b-[1px] border-richblack-600'>
                <button
                    onClick={() => setAccountType("Student")}
                    className={`${accountType === "Student" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                >
                    Student
                </button>

                <button
                    onClick={() => setAccountType("Instructor")}
                    className={`${accountType === "Instructor" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                >
                    Instructor
                </button>
            </div>

            <form
                onSubmit={handleSubmit(submitHandler)}
                className='w-full flex flex-col gap-4 mt-6'
                noValidate
            >
                <div className='w-full flex gap-4'>
                    {/* First Name */}
                    <label className='w-full'>
                        <p className='text-[14px] text-richblack-25 mb-1'>
                            First Name<sup className='ml-1 text-pink-200'>*</sup>
                        </p>

                        <input
                            type="text"
                            placeholder='Enter first name'
                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "First name is required"
                                }
                            })}
                            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs'>{errors?.firstName?.message}</p>

                    </label>

                    {/* Last Name */}
                    <label className='w-full'>
                        <p className='text-[14px] text-richblack-25 mb-1'>
                            Last Name<sup className='ml-1 text-pink-200'>*</sup>
                        </p>

                        <input
                            type="text"
                            placeholder='Enter last name'
                            {...register("lastName", {
                                required: {
                                    value: true,
                                    message: "Last name is required"
                                }
                            })}
                            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs'>{errors?.lastName?.message}</p>

                    </label>
                </div>

                {/* email address */}
                <label className='w-full'>
                    <p className='text-[14px] text-richblack-25 mb-1'>
                        Email Address<sup className='ml-1 text-pink-200'>*</sup>
                    </p>

                    <input
                        type="email"
                        placeholder='Enter email address'
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: "Enter valid email address"
                            }
                        })}
                        className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                    />

                    <p className='text-pink-200 text-xs'>{errors?.email?.message}</p>

                </label>

                <div className='w-full flex flex-col md:flex-row lg:flex-row gap-4'>
                    {/* Create password */}
                    <label className='w-full relative'>
                        <p className='text-[14px] text-richblack-25 mb-1'>
                            Create Password<sup className='ml-1 text-pink-200'>*</sup>
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

                    {/* Confirm Password */}
                    <label className='w-full relative'>
                        <p className='text-[14px] text-richblack-25 mb-1'>
                            Confirm Password<sup className='ml-1 text-pink-200'>*</sup>
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
                </div>

                <button className='mt-11 bg-yellow-50 rounded-lg font-medium text-richblack-900 px-3 py-2'>
                    Create Account
                </button>
            </form>
        </>
    )
}

export default SignupForm