import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-stars";
import { RiDeleteBin5Line } from "react-icons/ri";

import { removeFromCart } from "../../../../redux/slices/cartSlice";

const RenderCartCourses = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    return (
        <div>
            {
                cart.map((course, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <img
                                    src={course?.thumbnail}
                                    alt={`${course.courseName}-thumbnail`}
                                />

                                <div>
                                    <p>{course?.courseName}</p>
                                    <p>{course?.category?.name}</p>
                                    <div>
                                        <span>4.5</span>
                                        <ReactStars
                                            count={5}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                        // emptyIcon={ }
                                        // fullIcon={ }
                                        />
                                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button onClick={() => dispatch(removeFromCart(course._id))}>
                                    <RiDeleteBin5Line />
                                    Remove
                                </button>

                                <div>Rs {course.price}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RenderCartCourses