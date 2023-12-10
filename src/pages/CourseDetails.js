import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { toast } from "react-hot-toast";

import { fetchCourseDetails } from "services/operations/courseDetailsAPI";
import { buyCourse } from "services/operations/studentFeaturesAPI";
import { getAverageRating } from "utils/getAverageRating";
import Spinner from "components/common/Spinner";
import ConfirmationModal from "components/common/ConfirmationModal";
import { formatDate } from "utils/formatDate";
import { CourseDetailsCard } from "components/core/course/CourseDetailsCard";
import { ACCOUNT_TYPE } from "enums";
import { SectionAccordionBar } from "components/core/course/SectionAccordionBar";
import Footer from "components/common/Footer";

export const CourseDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [courseData, setCourseData] = useState(null);
    const [averageRatingCount, setAverageRatingCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(false);
    // stores which section is open in course content section
    const [activeAccordion, setActiveAccordion] = useState([]);

    useEffect(() => {
        setLoading(true);
        const getCourseDetails = async () => {
            const result = await fetchCourseDetails(courseId);
            setCourseData(result);

            // calculate average rating
            const count = getAverageRating(result?.courseDetails?.ratingAndReviews);
            setAverageRatingCount(count);

            // calculate total no. of lectures
            let lectures = 0;
            result?.courseDetails?.courseContent?.forEach((section) => {
                lectures = lectures + section?.subSection?.length;
            });
            setTotalNoOfLectures(lectures);
        };
        getCourseDetails();
        setLoading(false);
    }, [courseId]);

    const handleActiveAccordion = (id) => {
        setActiveAccordion(
            activeAccordion.includes(id) ?
                activeAccordion.filter((element) => element !== id) :
                activeAccordion.concat(id)
        )
    };

    const handleBuyCourse = async () => {
        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you can't buy a course");
            return;
        }
        // if user is logged in then buy course
        if (token) {
            await buyCourse(token, [courseId], user, navigate, dispatch)
            return;
        }

        // if user not logged in and want to buy course then show modal to login
        setConfirmationModal(true);
    };

    if (loading) {
        return <Spinner />;
    };

    return (
        <div>
            <div className="bg-richblack-800">
                <div className="relative max-w-maxContent mx-auto px-2 flex flex-col gap-4 pt-6 pb-10 md:py-32 text-richblack-5">
                    <div className="md:absolute top-20 right-5">
                        <CourseDetailsCard
                            courseData={courseData}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>

                    <p className="md:w-[48%] mt-5 md:mt-0 text-4xl font-bold text-richblack-5">
                        {courseData?.courseDetails?.courseName}
                    </p>
                    <p className="md:w-[48%] text-richblack-200 text-lg">
                        {courseData?.courseDetails?.courseDescription}
                    </p>
                    <div className="text-lg flex items-center gap-2 flex-wrap">
                        <p className="text-yellow-25 pt-1">{averageRatingCount}</p>
                        <StarRatings
                            numberOfStars={5}
                            rating={averageRatingCount}
                            starRatedColor="#E7C009"
                            starEmptyColor="#6E727F"
                            starDimension="18px"
                            starSpacing="1px"
                        />
                        <p className="pt-1">{`(${courseData?.courseDetails?.ratingAndReviews?.length} reviews)`}</p>
                        <p className="md:pt-1">{`${courseData?.courseDetails?.studentsEnrolled?.length} students enrolled`}</p>
                    </div>
                    <p className="text-lg">
                        {`Created By
                    ${courseData?.courseDetails?.instructor?.firstName}
                    ${courseData?.courseDetails?.instructor?.lastName}`}
                    </p>
                    <div className="text-lg flex flex-col md:flex-row gap-5 md:items-center">
                        <div className="flex md:items-center gap-2">
                            <IoMdInformationCircleOutline size={19} className="mt-1 md:mt-0" />
                            <p>
                                Created at {
                                    formatDate(courseData?.courseDetails?.createdAt)
                                }
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MdLanguage size={19} />
                            English
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-richblack-900">
                <div className="max-w-maxContent mx-auto px-2 text-richblack-5 mb-10">
                    <div className="max-w-maxContentTab">
                        <div className="my-8 border border-richblack-600 p-4 md:p-6">
                            <p className="text-3xl font-semibold mb-5">What you'll learn</p>
                            <p>{courseData?.courseDetails?.whatYouWillLearn}</p>
                        </div>

                        {/* Course content */}
                        <div>
                            <div className="text-[28px] font-semibold mb-3">Course Content</div>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <p>{courseData?.courseDetails?.courseContent?.length} section(s)</p>
                                    <p>{totalNoOfLectures} lecture(s)</p>
                                    <p>{courseData?.totalDuration} total length</p>
                                </div>

                                <div
                                    onClick={() => setActiveAccordion([])}
                                    className="text-yellow-25 cursor-pointer"
                                >
                                    Collapse all sections
                                </div>
                            </div>

                            {/* Course details accordion */}
                            <div className="py-4 mb-6">
                                {
                                    courseData?.courseDetails?.courseContent.map((section, index) => (
                                        <SectionAccordionBar
                                            key={index}
                                            section={section}
                                            activeAccordion={activeAccordion}
                                            handleActiveAccordion={handleActiveAccordion}
                                        />
                                    ))
                                }
                            </div>

                            {/* Author section */}
                            <div>
                                <p className="text-[28px] font-semibold">Author</p>
                                <div className="flex items-center gap-4 pt-4 pb-3">
                                    <img
                                        src={
                                            courseData?.courseDetails?.instructor?.image
                                                ? courseData?.courseDetails?.instructor?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${courseData?.courseDetails?.instructor?.firstName} ${courseData?.courseDetails?.instructor?.lastName}`
                                        }
                                        alt="instructor-thumbnail"
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                    <p className="text-lg">
                                        {`${courseData?.courseDetails?.instructor?.firstName} ${courseData?.courseDetails?.instructor?.lastName}`}
                                    </p>
                                </div>
                                <p className="text-richblack-100">
                                    {courseData?.courseDetails?.instructor?.additionalDetails?.about}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {
                confirmationModal &&
                <ConfirmationModal
                    heading1="You are not logged in"
                    heading2="Please login to purchase the course"
                    btnText1="Login"
                    btnText2="Cancel"
                    btn1Handler={() => navigate("/login")}
                    btn2Handler={() => setConfirmationModal(false)}
                />
            }
        </div>
    )
};