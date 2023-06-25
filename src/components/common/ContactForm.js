import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";

import countrycode from "../../data/countrycode.json";

const ContactForm = () => {
    const { handleSubmit, register, reset, formState } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "",
            phoneNumber: "",
            message: ""
        }
    });
    const { errors, isSubmitSuccessful } = formState;

    const submitHandler = (data) => {
        console.log(data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className='my-12 w-full flex flex-col gap-6'
        >
            {/* First name and Last name */}
            <div className='w-full flex gap-5'>
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

            {/* Phone number */}
            <label className='w-full'>
                <p className='text-[14px] text-richblack-25 mb-1'>
                    Phone Number<sup className='ml-1 text-pink-200'>*</sup>
                </p>

                <div className='flex gap-4'>
                    {/* TODO: add default value to option tag */}
                    <select
                        {...register("countryCode")}
                        className="w-[16%] bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] pr-0 border-b-[1px] border-richblack-300 outline-none"
                    >
                        {
                            countrycode.map((element, index) => {
                                const { country, code } = element;

                                return (
                                    <option
                                        key={index}
                                        value={code}
                                    >
                                        {code}
                                        {" - "}
                                        {country}
                                    </option>
                                )
                            })
                        }

                    </select>

                    <input
                        type="text"
                        placeholder='12345 67890'
                        {...register("phoneNumber", {
                            required: {
                                value: true,
                                message: "Phone number is required"
                            },
                            pattern: {
                                value: /^\d+$/,
                                message: "Please enter valid phone number"
                            }
                        })}
                        className="w-[84%] bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                    />
                </div>
                <p className='text-pink-200 text-xs'>{errors?.phoneNumber?.message}</p>
            </label>

            {/* Message */}
            <label className='w-full'>
                <p className='text-[14px] text-richblack-25 mb-1'>
                    Message<sup className='ml-1 text-pink-200'>*</sup>
                </p>

                <textarea
                    placeholder='Enter your message here'
                    {...register("message", {
                        required: {
                            value: true,
                            message: "Please enter some message"
                        }
                    })}
                    className="w-full min-h-[180px] bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                />

                <p className='text-pink-200 text-xs'>{errors?.message?.message}</p>

            </label>


            <button className='mt-2 bg-yellow-50 rounded-lg font-semibold text-richblack-900 px-3 py-2'>
                Send Message
            </button>
        </form>
    )
}

export default ContactForm