import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";

import { setStep, setCourse } from "redux/slices/courseSlice";
import Button from "components/common/Button";
import { fetchCourseCategories, editCourseDetails, addCourseDetails } from "services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "enums";

import Upload from "../Upload";

import RequirementsField from "./RequirementsField";
import ChipInput from "./ChipInput";

const CourseInformationForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      courseTitle: "",
      courseShortDesc: "",
      coursePrice: "",
      courseCategory: "",
      courseBenefits: ""
    }
  });
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    // check course details are updated or not, if updated return true else false
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tags.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }

    return false;
  };

  const submitHandler = async (data) => {
    // TODO: testing of edit course is remaining
    // Update existing course
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseTags.toString() !== course.tags.toString()) {
          formData.append("tags", JSON.stringify(data.courseTags));
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory !== course.category) {
          formData.append("category", data.courseCategory);
        }

        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setLoading(false);
      } else {
        toast.error("No changes done in course");
      }
      return;
    }

    // create new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tags", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <label className='w-full'>
        <p className='text-[14px] text-richblack-25 mb-[6px]'>
          Course Title<sup className='ml-1 text-pink-200'>*</sup>
        </p>

        <input
          type="text"
          placeholder='Enter Course Title'
          {...register("courseTitle", {
            required: {
              value: true,
              message: "Course title is required"
            }
          })}
          className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
        />

        <p className='text-pink-200 text-xs'>{errors?.courseTitle?.message}</p>
      </label>

      {/* Course Short Description */}
      <label className='w-full'>
        <p className='text-[14px] text-richblack-25 mb-[6px]'>
          Course Short Description<sup className='ml-1 text-pink-200'>*</sup>
        </p>

        <textarea
          placeholder='Enter Description'
          {...register("courseShortDesc", {
            required: {
              value: true,
              message: "Course description is required"
            }
          })}
          className="w-full min-h-[130px] bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
        />

        <p className='text-pink-200 text-xs -mt-[6px]'>{errors?.courseShortDesc?.message}</p>
      </label>

      {/* Course Price */}
      <label className='w-full relative'>
        <p className='text-[14px] text-richblack-25 mb-[6px]'>
          Course Price<sup className='ml-1 text-pink-200'>*</sup>
        </p>

        <input
          type="text"
          placeholder='Enter Course Price'
          {...register("coursePrice", {
            required: {
              value: true,
              message: "Course price is required"
            },
            valueAsNumber: true
          })}
          className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] pl-[45px] border-b-[1px] border-richblack-300 outline-none"
        />

        <HiOutlineCurrencyRupee className="text-2xl text-richblack-400 absolute top-[38px] left-[10px]" />

        <p className='text-pink-200 text-xs'>{errors?.coursePrice?.message}</p>
      </label>

      {/* Course Category */}
      <label className='w-full'>
        <p className='text-[14px] text-richblack-5 mb-[6px]'>
          Course Category<sup className='ml-1 text-pink-200'>*</sup>
        </p>

        <select
          {...register("courseCategory", {
            required: {
              value: true,
              message: "Course category is required"
            }
          })}
          className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] py-[12px] border-b-[1px] border-richblack-300 outline-none"
        >
          <option value="" disabled>Choose a Category</option>
          {
            courseCategories.map((element) => {
              return (
                <option key={element._id} value={element._id}>
                  {element.name}
                </option>
              )
            })
          }
        </select>

        <p className='text-pink-200 text-xs'>{errors?.courseCategory?.message}</p>
      </label>

      {/* Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      {/* Course thumbnail */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
        editData={editCourse ? course.thumbnail : null}
      />

      {/* Benefits of the course */}
      <label className='w-full'>
        <p className='text-[14px] text-richblack-25 mb-[6px]'>
          Benefits of the course<sup className='ml-1 text-pink-200'>*</sup>
        </p>

        <textarea
          placeholder='Enter benefits of the course'
          {...register("courseBenefits", {
            required: {
              value: true,
              message: "Benefits of the course is required"
            }
          })}
          className="w-full min-h-[130px] bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
        />

        <p className='text-pink-200 text-xs -mt-[6px]'>{errors?.courseBenefits?.message}</p>
      </label>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <div className="flex gap-2 justify-end">
        {
          editCourse &&
          <Button
            onClick={() => dispatch(setStep(2))}
            variant="variant3"
            disabled={loading}
          >
            Continue Without Saving
          </Button>

        }

        <Button
          disabled={loading}
          type="submit"
        >
          <div className="flex items-center gap-2">
            {editCourse ? "Save Changes" : "Next"}
            <MdNavigateNext />
          </div>
        </Button>
      </div>
    </form>
  )
}

export default CourseInformationForm