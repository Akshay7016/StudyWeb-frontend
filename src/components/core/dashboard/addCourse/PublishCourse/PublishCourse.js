import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import { setStep, resetCourseState } from 'redux/slices/courseSlice';
import { COURSE_STATUS } from 'enums';
import { editCourseDetails } from 'services/operations/courseDetailsAPI';

const PublishCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setIsChecked(true);
    }
    // eslint-disable-next-line
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate('/dashboard/my-courses');
  };

  const submitHandler = async () => {
    // No updation in the form => No need to make API call
    if ((course?.status === COURSE_STATUS.PUBLISHED && isChecked) ||
      (course?.status === COURSE_STATUS.DRAFT && !isChecked)) {
      goToCourses();
      return;
    }

    // Make API call
    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append("status", isChecked ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }

    setLoading(false);
  };

  return (
    <div className='rounded-md border bg-richblack-800 p-6 border-richblack-700'>
      <p className='text-richblack-5 text-2xl font-semibold'>Publish Settings</p>

      <div className='flex items-center gap-2 text-lg mt-6 mb-8'>
        <input
          type="checkbox"
          id="publish-checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
        />
        <label
          htmlFor='publish-checkbox'
          className='text-richblack-400 cursor-pointer'
        >
          Make this course as public
        </label>
      </div>

      <div className='flex gap-4 justify-end'>
        <Button
          onClick={goBack}
          variant="variant3"
          disabled={loading}
        >
          Back
        </Button>

        <Button
          onClick={submitHandler}
          disabled={loading}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default PublishCourse