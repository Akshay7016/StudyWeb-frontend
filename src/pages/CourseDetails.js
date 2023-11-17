import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "services/operations/studentFeaturesAPI";

export const CourseDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseId } = useParams();

    const handleBuyCourse = async () => {
        await buyCourse(token, [courseId], user, navigate, dispatch)
    }

    return (
        <div>
            <button onClick={handleBuyCourse} className="bg-yellow-50 px-12 py-7">
                Buy Now
            </button>
        </div>
    )
};