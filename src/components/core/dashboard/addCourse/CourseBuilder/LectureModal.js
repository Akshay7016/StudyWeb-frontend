import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";

import { createSubSection, updateSubSection } from 'services/operations/courseDetailsAPI';
import { setCourse } from 'redux/slices/courseSlice';
import Button from 'components/common/Button';

import Upload from '../Upload';

export const LectureModal = ({ lectureData, setLectureData, add = false, view = false, edit = false }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", lectureData.title);
            setValue("lectureDescription", lectureData.description);
            setValue("lectureVideo", lectureData.videoUrl);
        }
        // eslint-disable-next-line
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();

        return (
            currentValues.lectureTitle !== lectureData.title ||
            currentValues.lectureDescription !== lectureData.description ||
            currentValues.lectureVideo !== lectureData.videoUrl
        );
    };

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", lectureData.sectionId);
        formData.append("subSectionId", lectureData._id);

        if (currentValues.lectureTitle !== lectureData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDescription !== lectureData.description) {
            formData.append("description", currentValues.lectureDescription);
        }

        if (currentValues.lectureVideo !== lectureData.videoUrl) {
            formData.append("videoFile", currentValues.lectureVideo);
        }

        const result = await updateSubSection(formData, token);

        if (result) {
            // update the structure of the course
            const updatedCourseContent = course.courseContent.map((section) => section._id === lectureData.sectionId ? result : section
            );

            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse));
        }

        setLectureData(null);
    };

    const submitHandler = async (data) => {
        setLoading(true);
        if (view) return;

        // Edit lecture
        if (edit) {
            if (isFormUpdated()) {
                // update the sub-section
                handleEditSubSection();
            } else {
                toast.error("No changes made to the Lecture")
            }
            setLoading(false);
            return;
        }

        // Add lecture
        const formData = new FormData();
        formData.append("sectionId", lectureData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("videoFile", data.lectureVideo);

        const result = await createSubSection(formData, token);

        if (result) {
            // update the structure of the course
            const updatedCourseContent = course.courseContent.map((section) => section._id === lectureData ? result : section
            );

            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse));
        }

        setLoading(false);
        setLectureData(null);
    };

    return (
        <div className='fixed inset-0 top-0 bottom-0 left-0 right-0 overflow-auto bg-white bg-opacity-10 backdrop-blur-sm z-[200]'>
            <div className='my-10 mx-auto w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 z-[220]'>
                <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                    <p className='text-xl font-semibold text-richblack-5'>
                        {view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture
                    </p>

                    <button
                        className='text-xl text-white'
                        disabled={loading}
                        onClick={() => setLectureData(null)}
                    >
                        <RxCross1 />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="flex flex-col gap-8 px-8 py-10"
                >
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? lectureData.videoUrl : null}
                        editData={edit ? lectureData.videoUrl : null}
                    />

                    {/* Lecture Title */}
                    <label className='w-full'>
                        <p className='text-[14px] text-richblack-25 mb-[6px]'>
                            Lecture Title<sup className='ml-1 text-pink-200'>*</sup>
                        </p>

                        <input
                            type="text"
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", {
                                required: {
                                    value: true,
                                    message: "Lecture title is required"
                                }
                            })}
                            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs'>{errors?.lectureTitle?.message}</p>
                    </label>

                    {/* Lecture Description */}
                    <label className='w-full'>
                        <p className='text-[14px] text-richblack-25 mb-[6px]'>
                            Lecture Description<sup className='ml-1 text-pink-200'>*</sup>
                        </p>

                        <textarea
                            placeholder='Enter Lecture Description'
                            {...register("lectureDescription", {
                                required: {
                                    value: true,
                                    message: "Lecture description is required"
                                }
                            })}
                            className="w-full min-h-[130px] bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                        />

                        <p className='text-pink-200 text-xs -mt-[6px]'>{errors?.lectureDescription?.message}</p>
                    </label>

                    {
                        !view && (
                            <div className='flex justify-end'>
                                <Button
                                    type='submit'
                                    disabled={loading}
                                >
                                    {
                                        loading ? "Saving..." : edit ? "Save Changes" : "Save"
                                    }
                                </Button>
                            </div>
                        )
                    }
                </form>
            </div>

        </div>
    )
};