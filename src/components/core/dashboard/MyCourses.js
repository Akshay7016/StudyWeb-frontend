import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";

import Button from 'components/common/Button';
import { fetchInstructorCourses } from 'services/operations/courseDetailsAPI';

import { CourseTable } from './instructorCourses/CourseTable';

const MyCourses = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token);
            if (result) {
                setCourses(result);
            }
        };

        fetchCourses();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className='flex justify-between mb-14'>
                <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
                <Button
                    onClick={() => navigate("/dashboard/add-course")}
                    className="h-fit"
                >
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold'>Add Course</p>
                        <AiOutlinePlus />
                    </div>
                </Button>
            </div>

            <CourseTable courses={courses} setCourses={setCourses} />
        </div>
    )
};

export default MyCourses;