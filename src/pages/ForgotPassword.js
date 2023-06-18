import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { RxArrowLeft } from 'react-icons/rx';

import Spinner from "../components/common/Spinner";
import { getPasswordResetToken } from "../services/operations/authAPI"

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            email: ""
        }
    });
    const { errors } = formState;

    const submitHandler = (data) => {
        const { email: formEmail } = data;

        // If we get formEmail as undefined then set it with email state
        const EmailId = formEmail ? formEmail : email;

        dispatch(getPasswordResetToken(EmailId, setEmailSent));

        // if formEmail is not undefined then set Email state
        formEmail && setEmail(formEmail)
        reset();
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='w-full h-[calc(100vh-56px)] flex justify-center items-center'>
            <div className='max-w-[480px] p-5 md:p-8'>
                <h1 className='text-[26px] font-bold text-richblack-5'>
                    {
                        !emailSent ? "Reset your password" : "Check email"
                    }
                </h1>

                <p className={`${emailSent ? "mt-1" : "my-4"} text-[18px] leading-6 text-richblack-100`}>
                    {
                        !emailSent ?
                            "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery." : `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleSubmit(submitHandler)} noValidate>
                    {
                        !emailSent && (
                            <label>
                                <p className='text-sm text-richblack-5 mb-1'>Email Address<sup className='ml-1 text-pink-200'>*</sup></p>
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
                        )
                    }

                    <button
                        type='submit'
                        className='mt-6 w-full bg-yellow-50 rounded-lg font-medium text-richblack-900 px-3 py-2'
                    >
                        {!emailSent ? "Submit" : "Resend Email"}
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

export default ForgotPassword