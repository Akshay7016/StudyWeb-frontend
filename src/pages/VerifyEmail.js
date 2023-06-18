import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { RxArrowLeft, RxCountdownTimer } from "react-icons/rx";

import Spinner from "../components/common/Spinner";
import { signUp, sendOtp } from "../services/operations/authAPI";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
        } = signupData;

        dispatch(signUp(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));
    };

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
            navigate("/signup");
        }
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />
    };

    return (
        <div className='w-full h-[calc(100vh-56px)] flex justify-center items-center text-white'>
            <div className='max-w-[480px] p-8'>
                <h1 className='text-[26px] font-bold text-richblack-5'>
                    Verify Email
                </h1>

                <p className={`my-4 text-[18px] leading-6 text-richblack-100`}>
                    A verification code has been sent to you. Enter the code below
                </p>

                <form onSubmit={submitHandler}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                            <input
                                {...props}
                                placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[45px] md:w-[60px] border-0 bg-richblack-800 rounded-lg text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            />
                        )}
                        containerStyle={{
                            justifyContent: "space-between",
                        }}
                    />

                    <button
                        type='submit'
                        className='mt-6 w-full bg-yellow-50 rounded-lg font-medium text-richblack-900 px-3 py-2'
                    >
                        Verify Email
                    </button>
                </form>

                <div className='flex justify-between mt-5'>
                    <div>
                        <Link to="/signup">
                            <div className='flex gap-2 items-center text-richblack-5'>
                                <RxArrowLeft />
                                Back to Signup
                            </div>
                        </Link>
                    </div>

                    <div>
                        <button
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                            className='flex gap-2 items-center text-blue-100'
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail