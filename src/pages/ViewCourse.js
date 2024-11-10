import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { VideoDetailsSidebar } from "components/core/viewCourse/VideoDetailsSidebar";
import { CourseReviewModal } from "components/core/viewCourse/CourseReviewModal";
import { getFullDetailsOfCourse } from "services/operations/courseDetailsAPI";
import {
    setCompletedLectures,
    setCourseEntireData,
    setCourseSectionData,
    setTotalNoOfLectures
} from "redux/slices/viewCourseSlice";

const ViewCourse = () => {
    const dispatch = useDispatch();
    const [reviewModal, setReviewModal] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { courseId } = useParams();

    useEffect(() => {
        const getFullCourseDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setCourseEntireData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));

            const totalLectures = courseData?.courseDetails?.courseContent?.reduce((acc, section) =>
                acc = acc + section?.subSection?.length,
                0
            );
            dispatch(setTotalNoOfLectures(totalLectures));
        };

        getFullCourseDetails();
    }, [courseId, dispatch, token]);


    return (
        <>
            <div className='relative flex flex-col-reverse md:flex-row md:h-[calc(100vh-56px)]'>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                <div className='w-full md:h-[calc(100vh-56px)] overflow-auto'>
                    <div className='w-[98%] max-w-[1000px] mx-auto pt-2 pb-4'>
                        <Outlet />
                    </div>
                </div>
            </div>

            {
                reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
            }
        </>
    )
};

export default ViewCourse;
