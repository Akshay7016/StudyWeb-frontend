import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";

import { getUserEnrolledCourses } from "services/operations/profileAPI";
import Spinner from "components/common/Spinner";

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const getEnrolledCourses = async () => {
        setLoading(true);
        try {
            const courses = await getUserEnrolledCourses(token);
            setEnrolledCourses(courses);
        } catch (error) {
            console.log("Could not fetch enrolled courses")
        }
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
                    <div>
                        {/* heading */}
                        <div>
                            <p>Course Name</p>
                            <p>Durations</p>
                            <p>Progress</p>
                        </div>

                        {/* Show enrolled courses */}
                        {
                            enrolledCourses.map((course, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <img
                                                src={course.thumbnail}
                                                alt={`${course.courseName}-thumbnail`}
                                            />
                                            <div>
                                                <p>{course.courseName}</p>
                                                <p>{course.courseDescription}</p>
                                            </div>
                                        </div>

                                        <div>
                                            {course.totalDuration}
                                        </div>

                                        <div>
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