import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShareSquare } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { IoMdArrowDropright } from "react-icons/io";

import { ACCOUNT_TYPE } from "enums";
import Button from "components/common/Button";
import { addToCart } from "redux/slices/cartSlice";

export const CourseDetailsCard = ({ courseData, setConfirmationModal, handleBuyCourse }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you can't buy a course");
            return;
        }
        if (token) {
            dispatch(addToCart(courseData?.courseDetails));
            return;
        }
        // if user not logged in then display modal
        setConfirmationModal(true);
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard")
    }

    return (
        <div className="md:w-[440px] flex flex-col gap-4 p-4 bg-richblack-700 text-richblack-5 rounded-md">
            <img
                src={courseData?.courseDetails?.thumbnail}
                alt="course-thumbnail"
                className="max-h-[300px] min-h-[180px] w-full rounded-xl"
            />

            <div className="px-4">
                <p className="text-3xl font-semibold pb-4">
                    Rs. {courseData?.courseDetails?.price}
                </p>

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={user && courseData?.courseDetails?.studentsEnrolled?.includes(user._id) ?
                            () => navigate("/dashboard/enrolled-courses") :
                            handleBuyCourse
                        }
                    >
                        {
                            user && courseData?.courseDetails?.studentsEnrolled?.includes(user._id) ? "Go to course" : "Buy now"
                        }
                    </Button>

                    {
                        user && !courseData?.courseDetails?.studentsEnrolled?.includes(user._id) &&
                        <Button
                            variant="variant2"
                            className="!bg-richblack-900 !text-richblack-5"
                            onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                    }
                </div>


                <p className="text-center text-sm text-richblack-25 pb-3 pt-6">
                    30-Day Money-Back Guarantee
                </p>
                <p className="mt-2 mb-1 text-xl font-semibold">
                    This Course Includes :
                </p>
                <div className="flex flex-col gap-1">
                    {
                        courseData?.courseDetails?.instructions?.map((item, index) => (
                            <div key={index} className="flex items-start gap-[6px] text-sm text-caribbeangreen-100">
                                <span className="text-[22px]"><IoMdArrowDropright /></span>
                                <span>{item}</span>
                            </div>
                        ))
                    }
                </div>


                <div
                    className="w-fit mx-auto my-4 flex items-center gap-2 text-yellow-25 cursor-pointer"
                    onClick={handleShare}
                >
                    <FaShareSquare />
                    <p>Share</p>
                </div>
            </div>
        </div>
    )
};