import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AiFillClockCircle } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import ConfirmationModal from "components/common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from 'services/operations/courseDetailsAPI';
import { COURSE_STATUS } from 'enums';
import { formatDate } from 'utils/formatDate';

export const CourseTable = ({ courses, setCourses }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async () => {
        setLoading(true);
        await deleteCourse({ courseId: confirmationModal }, token);

        // Now get updated instructor courses
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false)
    };

    return (
        <>
            <Table className="rounded-xl border border-richblack-800 text-white">
                <Thead>
                    <Tr className="flex gap-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length ? (
                            courses.map((course) => (
                                <Tr
                                    key={course._id}
                                    className="flex gap-10 border-b border-richblack-800 px-6 py-8"
                                >
                                    <Td className="flex flex-1 gap-4">
                                        <img
                                            src={course.thumbnail}
                                            alt="course-thumbnail"
                                            className='h-[148px] w-[220px] rounded-lg'
                                        />

                                        <div className="flex flex-col justify-between">
                                            <p className="text-lg font-semibold text-richblack-5">
                                                {course.courseName}
                                            </p>

                                            <p className="text-xs text-richblack-300">
                                                {course.courseDescription.split(" ").length >
                                                    TRUNCATE_LENGTH
                                                    ? course.courseDescription
                                                        .split(" ")
                                                        .slice(0, TRUNCATE_LENGTH)
                                                        .join(" ") + "..."
                                                    : course.courseDescription}
                                            </p>

                                            <p className="text-[12px] text-white">
                                                Created: {formatDate(course.createdAt)}
                                            </p>

                                            {
                                                course.status === COURSE_STATUS.DRAFT ?
                                                    <div
                                                        className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100"
                                                    >
                                                        <AiFillClockCircle size={15} /> Drafted
                                                    </div> :
                                                    <div className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100"
                                                    >
                                                        <RiCheckboxCircleFill size={15} /> Published
                                                    </div>

                                            }
                                        </div>
                                    </Td>

                                    <Td className="text-sm font-medium text-richblack-100">
                                        {course?.totalDuration}
                                    </Td>

                                    <Td className="text-sm font-medium text-richblack-100">
                                        ₹ {course.price}
                                    </Td>

                                    <Td>
                                        <button
                                            disabled={loading}
                                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                            className="mr-3 text-richblack-100 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                        >
                                            <FiEdit2 size={20} />
                                        </button>

                                        <button
                                            disabled={loading}
                                            onClick={() => setConfirmationModal(course._id)}
                                            className="text-richblack-100 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                    No courses found
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>

            {
                confirmationModal &&
                <ConfirmationModal
                    heading1="Do you want to delete this course?"
                    heading2="All the data related to this course will be deleted"
                    btnText1="Delete"
                    btnText2="Cancel"
                    btn1Handler={handleCourseDelete}
                    btn2Handler={() => setConfirmationModal(null)}
                />
            }
        </>
    )
};