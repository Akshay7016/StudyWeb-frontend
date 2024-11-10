import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import Spinner from "components/common/Spinner";
import { getFullDetailsOfCourse } from "services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "redux/slices/courseSlice";

import RenderSteps from "../addCourse/RenderSteps";

const EditCourse = () => {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);

            const result = await getFullDetailsOfCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }

            setLoading(false);
        };

        fetchCourseDetails();
        // eslint-disable-next-line
    }, [courseId])

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <h1 className='text-3xl font-medium text-richblack-5 mb-14'>Edit Course</h1>
            <div className="max-w-[600px] mx-auto">
                {
                    course ?
                        <RenderSteps /> :
                        <p className="text-3xl text-center text-richblack-100 font-semibold">
                            Course not found
                        </p>
                }
            </div>
        </>
    )
};

export default EditCourse;