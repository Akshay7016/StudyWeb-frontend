import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const { errors } = formState;

    const submitHandler = (data) => {
        console.log(data);
        reset();
        navigate("/dashboard");
    }

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className='w-full flex flex-col gap-4 mt-6'
            noValidate
        >
            <label className='w-full'>
                <p className='text-[14px] text-richblack-25 mb-1'>
                    Email Address<sup className='text-pink-200'>*</sup>
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
                    className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-200 outline-none"
                />

                <p className='text-pink-200 text-xs'>{errors?.email?.message}</p>

            </label>

            <label className='w-full relative'>
                <p className='text-[14px] text-richblack-25 mb-1'>
                    Password<sup className='text-pink-200'>*</sup>
                </p>

                <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", {
                        required: "Password is required"
                    })}
                    className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-200 outline-none"
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

                <Link to="#">
                    <p className='text-xs mt-1 text-blue-100 absolute right-0'>
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button className='mt-11 bg-yellow-50 rounded-lg font-medium text-richblack-900 px-3 py-2'>
                Sign in
            </button>
        </form>
    )
}

export default LoginForm;