import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const submitHandler = (data) => {
        console.log(data);
        reset();
        navigate("/dashboard");
    }

    // TODO: add custom form field validation
    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className='w-full flex flex-col gap-4 mt-6'
        >
            <label className='w-full'>
                <p className='text-[14px] text-richblack-25 mb-1'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </p>

                <input
                    required
                    type="email"
                    placeholder='Enter email address'
                    {...register("email")}
                    className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-200 outline-none"
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[14px] text-richblack-25 mb-1'>
                    Password<sup className='text-pink-200'>*</sup>
                </p>

                <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                    className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-200 outline-none"
                />

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