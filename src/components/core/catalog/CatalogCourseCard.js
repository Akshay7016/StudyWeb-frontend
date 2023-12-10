import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { getAverageRating } from 'utils/getAverageRating'

export const CatalogCourseCard = ({ course, height }) => {
    const navigate = useNavigate();
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const count = getAverageRating(course?.ratingAndReviews);
        setAverageRating(count)
    }, [course._id, course?.ratingAndReviews]);

    return (
        <div
            className="cursor-pointer"
            onClick={() => navigate(`/courses/${course._id}`)}
        >
            <img
                src={course?.thumbnail}
                alt="course thumbnail"
                className={`${height} w-full rounded-xl`}
            />
            <div className="flex flex-col gap-2 px-1 py-3">
                <p className="text-xl text-richblack-5">{course?.courseName}</p>
                <p className="text-sm text-richblack-50">
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                </p>
                <div className="flex items-center gap-2">
                    <p className="pt-1 text-[#E7C009]">{averageRating ?? 0}</p>
                    <StarRatings
                        numberOfStars={5}
                        rating={averageRating}
                        starRatedColor="#E7C009"
                        starEmptyColor="#6E727F"
                        starDimension="16px"
                        starSpacing="1px"
                    />
                    <p className="pt-1 text-richblack-400">{course?.ratingAndReviews?.length} Ratings</p>
                </div>
                <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
            </div>
        </div>
    )
};