import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { RiDeleteBin5Line } from "react-icons/ri";

import { removeFromCart } from "redux/slices/cartSlice";
import { getAverageRating } from "utils/getAverageRating";

const RenderCartCourses = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    return (
        <div className="md:w-[70%] h-fit flex flex-col gap-6">
            {
                cart.map((course) => {
                    const averageRating = getAverageRating(course?.ratingAndReviews);

                    return (
                        <div
                            key={course._id}
                            className="w-full flex flex-col md:flex-row justify-between gap-6 pb-6 last:pb-0 last:border-none border-b border-richblack-400"
                        >
                            <div className="flex flex-col md:flex-row gap-4">
                                <img
                                    src={course?.thumbnail}
                                    alt={`${course.courseName}-thumbnail`}
                                    className="md:h-[148px] w-full md:w-[220px] rounded-lg"
                                />

                                <div className="flex flex-col gap-1">
                                    <p className="text-lg font-medium text-richblack-5">
                                        {course?.courseName}
                                    </p>

                                    <p className="text-sm text-richblack-300">
                                        {course?.category?.name}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <span className="pt-1 text-yellow-50">{averageRating}</span>

                                        <StarRatings
                                            numberOfStars={5}
                                            rating={averageRating}
                                            starRatedColor="#E7C009"
                                            starEmptyColor="#6E727F"
                                            starDimension="16px"
                                            starSpacing="1px"
                                        />

                                        <span className="pt-1 text-richblack-400">
                                            {course?.ratingAndReviews?.length} Ratings
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row-reverse justify-between md:justify-start md:flex-col gap-2 items-center">
                                <button
                                    onClick={() => dispatch(removeFromCart(course._id))}
                                    className="flex items-center gap-1 rounded-md border border-richblack-600 bg-richblack-700 p-3 text-pink-200"
                                >
                                    <RiDeleteBin5Line />
                                    Remove
                                </button>

                                <div className="text-3xl font-medium text-yellow-100">
                                    ₹ {course.price}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RenderCartCourses