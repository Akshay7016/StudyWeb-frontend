import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { changePassword } from "services/operations/settingsAPI";
import Button from "components/common/Button";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: ""
        }
    });

    const submitHandler = async (data) => {
        await changePassword(token, data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='mt-10 mb-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-4 md:py-8 px-4 md:px-12'>
                <p className='text-lg font-semibold text-richblack-5 mb-6'>
                    Password
                </p>

                <div className="flex flex-col md:flex-row gap-5">
                    {/* Current password */}
                    <label className='w-full relative'>
                        <p className='text-[14px] text-richblack-5 mb-1'>
                            Current Password
                        </p>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Current Password"
                            {...register("currentPassword", {
                                required: "Please enter your Current Password"
                            })}
                            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs'>{errors?.currentPassword?.message}</p>

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

                    {/* New password */}
                    <label className='w-full relative'>
                        <p className='text-[14px] text-richblack-5 mb-1'>
                            New Password
                        </p>

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter New Password"
                            {...register("newPassword", {
                                required: "Please enter your New Password"
                            })}
                            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs'>{errors?.newPassword?.message}</p>

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
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    onClick={() => navigate("/dashboard/my-profile")}
                    variant="variant2"
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="variant1"
                >
                    Update
                </Button>
            </div>
        </form>
    )
}

export default UpdatePassword