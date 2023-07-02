import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../common/Button";

const genders = ["Male", "Female", "Other"];

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            dateOfBirth: user?.additionalDetails?.dateOfBirth,
            gender: user?.additionalDetails?.gender,
            contactNumber: user?.additionalDetails?.contactNumber,
            about: user?.additionalDetails?.about
        }
    });

    const submitHandler = (data) => {
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
        >
            <div className='my-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12'>
                <p className='text-lg font-semibold text-richblack-5 mb-6'>
                    Profile Information
                </p>

                <div className="flex flex-col gap-6">
                    {/* first name, last name */}
                    <div className="flex gap-5">
                        {/* First name */}
                        <label className='w-full'>
                            <p className='text-[14px] text-richblack-5 mb-1'>
                                First Name
                            </p>

                            <input
                                type="text"
                                placeholder='Enter first name'
                                {...register("firstName", {
                                    required: {
                                        value: true,
                                        message: "Please enter your first name"
                                    },
                                })}
                                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                            />

                            <p className='text-yellow-100 text-xs'>{errors?.firstName?.message}</p>
                        </label>

                        {/* Last name */}
                        <label className='w-full'>
                            <p className='text-[14px] text-richblack-5 mb-1'>
                                Last Name
                            </p>

                            <input
                                type="text"
                                placeholder='Enter last name'
                                {...register("lastName", {
                                    required: {
                                        value: true,
                                        message: "Please enter your last name"
                                    },
                                })}
                                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                            />

                            <p className='text-yellow-100 text-xs'>{errors?.lastName?.message}</p>
                        </label>
                    </div>

                    {/* Date of birth, Gender */}
                    <div className="flex gap-5">
                        {/* Date of birth */}
                        <label className='w-full'>
                            <p className='text-[14px] text-richblack-5 mb-1'>
                                Date of Birth
                            </p>

                            <input
                                type="date"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Date of Birth"
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                            />

                            <p className='text-yellow-100 text-xs'>{errors?.dateOfBirth?.message}</p>
                        </label>

                        {/* Gender */}
                        <label className='w-full'>
                            <p className='text-[14px] text-richblack-5 mb-1'>
                                Gender
                            </p>

                            <select
                                {...register("gender", {
                                    required: {
                                        value: true,
                                        message: "Please choose your gender"
                                    }
                                })}
                                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] py-[12px] border-b-[1px] border-richblack-300 outline-none"
                            >
                                {
                                    genders.map((element, index) => {
                                        return (
                                            <option key={index} value={element}>
                                                {element}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <p className='text-yellow-100 text-xs'>{errors?.gender?.message}</p>
                        </label>
                    </div>

                    {/* Contact number and About */}
                    <div className="flex gap-5">
                        {/* Contact number */}
                        <label className='w-full'>
                            <p className='text-[14px] text-richblack-5 mb-1'>
                                Contact Number
                            </p>

                            <input
                                type="tel"
                                placeholder="Enter contact number"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message: "Please enter your contact number"
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Invalid Contact Number"
                                    },
                                    maxLength: {
                                        value: 12, message: "Invalid Contact Number"
                                    },
                                    minLength: {
                                        value: 10, message: "Invalid Contact Number"
                                    },
                                })}
                                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                            />

                            <p className='text-yellow-100 text-xs'>{errors?.contactNumber?.message}</p>
                        </label>

                        {/* About */}
                        <label className='w-full'>
                            <p className='text-[14px] text-richblack-5 mb-1'>
                                About
                            </p>

                            <input
                                type="text"
                                placeholder="Enter bio details"
                                {...register("about", {
                                    required: {
                                        value: true,
                                        message: "Please enter your bio details"
                                    },
                                })}
                                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                            />

                            <p className='text-yellow-100 text-xs'>{errors?.about?.message}</p>
                        </label>
                    </div>
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
                    Save
                </Button>
            </div>
        </form>
    )
}

export default EditProfile