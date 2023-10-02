import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FcVideoFile, FcOpenedFolder } from "react-icons/fc";

import ConfirmationModal from 'components/common/ConfirmationModal';
import { deleteSection, deleteSubSection } from 'services/operations/courseDetailsAPI';
import { setCourse } from 'redux/slices/courseSlice';

import { LectureModal } from './LectureModal';

export const NestedView = ({ handleEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [deleteSectionModal, setDeleteSectionModal] = useState(null);
    const [deleteSubSectionModal, setDeleteSubSectionModal] = useState(null);

    const handleSectionDelete = async (sectionId) => {
        const result = await deleteSection({ sectionId, courseId: course._id }, token);

        if (result) {
            dispatch(setCourse(result));
        }
        setDeleteSectionModal(null);
    };

    const handleSubSectionDelete = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ sectionId, subSectionId }, token);

        if (result) {
            // update the structure of the course
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section
            );

            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse));
        }
        setDeleteSubSectionModal(null);
    };

    return (
        <>
            <div className='rounded-lg bg-richblack-700 px-8 py-6 my-8'>
                {course.courseContent.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex justify-between items-center border-b-2 border-b-richblack-600 py-2 cursor-pointer'>
                            <div className='flex items-center gap-3 text-richblack-50'>
                                <FcOpenedFolder className='text-2xl' />
                                <p className='font-semibold'>{section.sectionName}</p>
                            </div>

                            <div className='flex items-center gap-3 text-richblack-300'>
                                <button onClick={() => handleEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit className='text-xl' />
                                </button>

                                <button onClick={() => setDeleteSectionModal(section._id)}>
                                    <RiDeleteBin6Line className='text-xl' />
                                </button>

                                <span>|</span>

                                <AiOutlineCaretDown className='text-xl' />
                            </div>
                        </summary>

                        <div className='px-6 pb-4'>
                            {
                                section.subSection.map((subSection) => (
                                    <div
                                        key={subSection._id}
                                        onClick={() => setViewSubSection(subSection)}
                                        className="flex cursor-pointer items-center py-4 justify-between border-b-2 border-b-richblack-600"
                                    >
                                        <div className='flex items-center gap-3 text-richblack-50'>
                                            <FcVideoFile className='text-2xl' />
                                            <p className='font-semibold'>{subSection.title}</p>
                                        </div>

                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className='flex items-center gap-3 text-richblack-300'
                                        >
                                            <button onClick={() => setEditSubSection({ ...subSection, sectionId: section._id })}>
                                                <MdEdit className='text-xl' />
                                            </button>

                                            <button onClick={() => setDeleteSubSectionModal({ ...subSection, sectionId: section._id })}>
                                                <RiDeleteBin6Line className='text-xl' />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className='mt-3 flex items-center gap-2 text-yellow-50'
                            >
                                <FaPlus className='text-lg' />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {/* Show delete modal for section */}
            {
                deleteSectionModal &&
                <ConfirmationModal
                    heading1="Delete this Section?"
                    heading2="All the lectures in this section will be deleted"
                    btnText1="Delete"
                    btnText2="Cancel"
                    btn1Handler={() => handleSectionDelete(deleteSectionModal)}
                    btn2Handler={() => setDeleteSectionModal(null)}
                />
            }

            {/* Show delete modal for sub-section */}
            {
                deleteSubSectionModal &&
                <ConfirmationModal
                    heading1="Delete this Lecture?"
                    heading2="This lecture will be deleted"
                    btnText1="Delete"
                    btnText2="Cancel"
                    btn1Handler={() => handleSubSectionDelete(deleteSubSectionModal._id, deleteSubSectionModal.sectionId)}
                    btn2Handler={() => setDeleteSubSectionModal(null)}
                />
            }

            {
                addSubSection &&
                <LectureModal
                    lectureData={addSubSection}
                    setLectureData={setAddSubSection}
                    add={true}
                />
            }

            {
                viewSubSection &&
                <LectureModal
                    lectureData={viewSubSection}
                    setLectureData={setViewSubSection}
                    view={true}
                />
            }

            {
                editSubSection &&
                <LectureModal
                    lectureData={editSubSection}
                    setLectureData={setEditSubSection}
                    edit={true}
                />
            }
        </>
    )
}