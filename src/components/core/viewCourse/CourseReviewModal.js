import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import Button from "components/common/Button";
import { createRating } from "services/operations/courseDetailsAPI";

export const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseId } = useParams();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            courseReview: "",
            courseRating: 0
        }
    });

    const submitHandler = async (data) => {
        await createRating({
            rating: data.courseRating,
            review: data.courseReview,
            courseId
        }, token);
    }

    return (
        <>
            <div
                className='fixed top-0 bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-sm z-[199]'>
            </div>

            <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-11/12 max-w-[520px] rounded-lg border border-richblack-500 bg-richblack-800 z-[220]'>
                <div className='flex items-center justify-between p-4 bg-richblack-700 rounded-lg'>
                    <p className='text-xl text-richblack-5 font-semibold'>Add Review</p>
                    <AiOutlineClose
                        className="text-white cursor-pointer"
                        size={18}
                        onClick={() => setReviewModal(false)}
                    />
                </div>

                <div className="px-10 py-5">
                    {/* user profile and name */}
                    <div className="w-fit mx-auto flex items-center gap-3 mb-5">
                        <img
                            src={user?.image}
                            alt="user-profile"
                            className="w-[50px] aspect-square rounded-full object-cover"
                        />

                        <div>
                            <p className="font-semibold text-richblack-5">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-richblack-25">Posting publicly</p>
                        </div>
                    </div>

                    {/* star rating */}
                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        className="flex flex-col items-center justify-center"
                    >
                        <StarRatings
                            numberOfStars={5}
                            rating={watch("courseRating")}
                            changeRating={(rating) => setValue("courseRating", rating)}
                            starRatedColor="#E7C009"
                            starEmptyColor="#6E727F"
                            starHoverColor="#E7C009"
                            starDimension="26px"
                            starSpacing="1px"
                        />

                        <label className='w-full mt-1 mb-2'>
                            <p className='text-sm text-richblack-5 mb-[6px]'>
                                Add your review <sup className=' text-pink-200'>*</sup>
                            </p>

                            <textarea
                                placeholder='Add your review about course'
                                {...register("courseReview", {
                                    required: {
                                        value: true,
                                        message: "Course review is required"
                                    }
                                })}
                                className="w-full min-h-[120px] bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
                            />

                            <p className='text-pink-200 text-xs'>{errors?.courseReview?.message}</p>
                        </label>

                        <div className="w-full flex gap-4 justify-end">
                            <Button
                                variant="variant3"
                                onClick={() => setReviewModal(false)}>
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
