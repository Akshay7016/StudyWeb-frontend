import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

import { getUserEnrolledCourses } from "services/operations/profileAPI";
import Spinner from "components/common/Spinner";

const EnrolledCourses = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const getEnrolledCourses = async () => {
        setLoading(true);
        const courses = await getUserEnrolledCourses(token);
        setEnrolledCourses(courses);
        setLoading(false);
    };

    useEffect(() => {
        getEnrolledCourses();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />
    };

    return (
        <div>
            <div className='text-3xl font-medium text-richblack-5 mb-4'>
                Enrolled Courses
            </div>

            {

                !enrolledCourses.length ? (
                    <div className='text-richblack-5 text-center'>
                        You have not enrolled in any course yet.
                    </div>
                ) : (
                    <div className='text-richblack-5'>
                        {/* heading */}
                        <div className='flex rounded-t-lg bg-richblack-500 text-richblack-5'>
                            <p className='w-[45%] px-5 py-3'>Course Name</p>
                            <p className='w-1/4 px-2 py-3'>Durations</p>
                            <p className='flex-1 px-2 py-3'>Progress</p>
                        </div>

                        {/* Show enrolled courses */}
                        {
                            enrolledCourses.map((course, index, array) => {
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center border border-richblack-700 last:rounded-b-lg`}
                                    >
                                        {/* Course Name */}
                                        <div
                                            className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                            onClick={() => navigate(`/view-course/${course._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`)}
                                        >
                                            <img
                                                src={course.thumbnail}
                                                alt={`${course.courseName}-thumbnail`}
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />
                                            <div className='flex flex-col gap-2 max-w-xs'>
                                                <p className='font-semibold'>{course.courseName}</p>
                                                <p className='text-xs text-richblack-300'>
                                                    {course.courseDescription.length > 50
                                                        ? `${course.courseDescription.slice(0, 50)}...`
                                                        : course.courseDescription
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {/* Course duration */}
                                        <div className="w-1/4 px-2 py-3">
                                            {course.totalDuration}
                                        </div>

                                        {/* Progress bar */}
                                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                            <div>
                                                Progress: {course.progressPercentage || 0}%
                                            </div>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default EnrolledCourses