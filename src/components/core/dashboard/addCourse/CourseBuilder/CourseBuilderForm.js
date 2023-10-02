import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { createSection, updateSection } from "services/operations/courseDetailsAPI"
import Button from "components/common/Button";
import { setStep, setEditCourse, setCourse } from 'redux/slices/courseSlice';

import { NestedView } from './NestedView';

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      sectionName: ""
    }
  });
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }

    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    // if everything is fine then go to 3rd step
    dispatch(setStep(3));
  };

  const submitHandler = async (data) => {
    setLoading(true);
    const result = editSectionName ?
      await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      }, token) :
      await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token);

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const handleEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div
      className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      <h1 className='text-2xl font-semibold text-richblack-5 mb-8'>Course Builder</h1>

      <form onSubmit={handleSubmit(submitHandler)}>
        {/* Section Name */}
        <label className='w-full'>
          <p className='text-[14px] text-richblack-25 mb-[6px]'>
            Section Name<sup className='ml-1 text-pink-200'>*</sup>
          </p>

          <input
            type="text"
            disabled={loading}
            placeholder='Add a section to build your course'
            {...register("sectionName", {
              required: {
                value: true,
                message: "Section name is required"
              }
            })}
            className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
          />

          <p className='text-pink-200 text-xs'>{errors?.sectionName?.message}</p>
        </label>

        <div className='mt-4 flex gap-4 items-end'>
          <Button
            type='submit'
            className='border border-yellow-50 !bg-transparent !text-yellow-50'
            disabled={loading}
          >
            <div className='flex gap-2 items-center'>
              {editSectionName ? "Edit Section Name" : "Create Section"}
              <AiOutlinePlusCircle className='text-lg' />
            </div>
          </Button>

          {
            editSectionName && (
              <button
                onClick={cancelEdit}
                className="text-sm text-richblack-300 underline"
              >
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>

      {
        course.courseContent?.length > 0 && (
          <NestedView handleEditSectionName={handleEditSectionName} />
        )
      }

      <div className='flex justify-end gap-3'>
        <Button
          onClick={goBack}
          variant="variant3"
        >
          Back
        </Button>

        <Button
          onClick={goToNext}
          disabled={loading}
        >
          <div className='flex gap-1 items-center'>
            Next
            <MdNavigateNext className='text-xl' />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default CourseBuilderForm