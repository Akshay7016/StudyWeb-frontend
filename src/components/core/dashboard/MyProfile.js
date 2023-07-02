import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";

import Button from "../../common/Button";
import { formattedDate } from '../../../utils/dateFormatter';

const MyProfile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);

    return (
        <div>
            <h1 className='text-3xl font-medium text-richblack-5 mb-14'>
                My Profile
            </h1>

            {/* Section 1 */}
            <div className='flex justify-between items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12'>
                <div className='flex gap-4 items-center'>
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover"
                    />

                    <div className='flex flex-col'>
                        <p className='text-lg font-semibold text-richblack-5'>
                            {`${user?.firstName} ${user?.lastName}`}
                        </p>

                        <p className='text-sm text-richblack-300'>
                            {user?.email}
                        </p>
                    </div>
                </div>

                <Button variant='variant1' onClick={() => navigate("/dashboard/settings")}>
                    <div className='flex gap-2 items-center'>
                        Edit
                        <RiEditBoxLine />
                    </div>
                </Button>
            </div>

            {/* section 2 */}
            <div className='flex flex-col gap-8 my-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12'>
                <div className='flex justify-between'>
                    <p className='text-lg font-semibold text-richblack-5'>
                        About
                    </p>

                    <Button variant='variant1' onClick={() => navigate("/dashboard/settings")}>
                        <div className='flex gap-2 items-center'>
                            Edit
                            <RiEditBoxLine />
                        </div>
                    </Button>
                </div>

                <p className='text-sm font-medium text-richblack-400'>
                    {
                        user?.additionalDetails?.about ?? "Write Something About Yourself"
                    }
                </p>
            </div>

            {/* section 3 */}
            <div className='flex flex-col gap-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12'>
                <div className='flex justify-between'>
                    <p className='text-lg font-semibold text-richblack-5'>
                        Personal Details
                    </p>

                    <Button variant='variant1' onClick={() => navigate("/dashboard/settings")}>
                        <div className='flex gap-2 items-center'>
                            Edit
                            <RiEditBoxLine />
                        </div>
                    </Button>
                </div>

                <div className='flex gap-32'>
                    {/* First name, Email, Gender */}
                    <div className='flex flex-col gap-6'>
                        {/* First Name */}
                        <div>
                            <p className='text-sm text-richblack-400 mb-[6px]'>
                                First Name
                            </p>

                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.firstName}
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <p className='text-sm text-richblack-400 mb-[6px]'>
                                Email
                            </p>

                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.email}
                            </p>
                        </div>

                        {/* Gender */}
                        <div>
                            <p className='text-sm text-richblack-400 mb-[6px]'>
                                Gender
                            </p>

                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                    </div>

                    {/* Last name, Phone number, DOB */}
                    <div className='flex flex-col gap-6'>
                        {/* Last Name */}
                        <div>
                            <p className='text-sm text-richblack-400 mb-[6px]'>
                                Last Name
                            </p>

                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.lastName}
                            </p>
                        </div>

                        {/* Phone number */}
                        <div>
                            <p className='text-sm text-richblack-400 mb-[6px]'>
                                Phone Number
                            </p>

                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <p className='text-sm text-richblack-400 mb-[6px]'>
                                Date Of Birth
                            </p>

                            <p className='text-sm font-medium text-richblack-5'>
                                {
                                    user?.additionalDetails?.dateOfBirth ?
                                        formattedDate(user?.additionalDetails?.dateOfBirth) :
                                        "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile