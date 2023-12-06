import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from 'components/common/Spinner';
import { getInstructorDashboardDetails } from 'services/operations/profileAPI';

import { InstructorChart } from './InstructorChart';

export const InstructorDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)

    useEffect(() => {
        const getCourseDataWithStatus = async () => {
            setLoading(true);

            const dashboardData = await getInstructorDashboardDetails(token);
            setInstructorData(dashboardData);

            setLoading(false);
        };

        getCourseDataWithStatus();
    }, [token]);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='text-white'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold text-richblack-5'>
                    Hi {user?.firstName} 👋
                </h1>
                <p className="font-medium text-richblack-200">Let's start something new</p>
            </div>

            {
                !!instructorData.length ? (
                    <div>
                        {/* Pie chart and statistics */}
                        <div className='my-10 h-[450px] flex gap-4'>
                            {
                                totalAmount > 0 || totalStudents > 0 ? (
                                    <InstructorChart courses={instructorData} />
                                ) : (
                                    <div className='w-full rounded-md bg-richblack-800 p-6'>
                                        <p className="text-lg font-bold text-richblack-5">Visualize</p>
                                        <p className="mt-4 text-xl font-medium text-richblack-50">
                                            Not enough data to visualize
                                        </p>
                                    </div>
                                )
                            }


                            <div className='min-w-[250px] flex flex-col rounded-md bg-richblack-800 p-6'>
                                <p className="text-lg font-bold text-richblack-5 mb-4">
                                    Statistics
                                </p>

                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <p className="text-lg text-richblack-200">Total courses</p>
                                        <p className="text-3xl font-semibold text-richblack-50">        {instructorData.length}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-lg text-richblack-200">Total students</p>
                                        <p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                                    </div>

                                    <div>
                                        <p className="text-lg text-richblack-200">Total income</p>
                                        <p className="text-3xl font-semibold text-richblack-50">Rs {totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Render 3 courses */}
                        <div className="rounded-md bg-richblack-800 p-6">
                            <div className='flex items-center justify-between mb-4'>
                                <p className="text-lg font-bold text-richblack-5">
                                    Your courses
                                </p>
                                <p
                                    className='cursor-pointer text-xs font-semibold text-yellow-50'
                                    onClick={() => navigate("/dashboard/my-courses")}
                                >
                                    View all
                                </p>
                            </div>

                            <div className='flex gap-6'>
                                {
                                    instructorData.slice(0, 3).map((course) => (
                                        <div key={course._id} className="w-1/3">
                                            <img
                                                src={course?.thumbnail}
                                                alt="course-thumbnail"
                                                className="h-[201px] w-full rounded-md"
                                            />
                                            <div className='mt-3 w-full'>
                                                <p className="text-sm font-medium text-richblack-50">{course?.courseName}
                                                </p>
                                                <div className='mt-1 flex items-center gap-2'>
                                                    <p className="text-xs font-medium text-richblack-300">
                                                        {course.totalStudentsEnrolled} students
                                                    </p>
                                                    <p className="text-xs font-medium text-richblack-300"> | </p>
                                                    <p className="text-xs font-medium text-richblack-300">
                                                        Rs {course?.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='mt-20 rounded-md bg-richblack-800 p-6 py-20'>
                        <p className="text-center text-2xl font-bold text-richblack-5">
                            You have not created any courses yet
                        </p>
                        <p
                            className="cursor-pointer mt-1 text-center text-lg font-semibold text-yellow-50"
                            onClick={() => navigate("/dashboard/add-course")}
                        >
                            Create a course
                        </p>
                    </div>
                )
            }
        </div>
    )
};