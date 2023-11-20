import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from "components/common/Button";
import { buyCourse } from 'services/operations/studentFeaturesAPI';

const RenderTotalAmount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { total, cart } = useSelector((state) => state.cart);

    const handleBuyCourse = async () => {
        const courses = cart.map((course) => course._id);
        await buyCourse(token, courses, user, navigate, dispatch)
    }

    return (
        <div className='w-[30%] h-fit rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
            <div className='mb-1 text-sm font-medium text-richblack-300'>
                Total:
            </div>

            <div className='mb-6 text-3xl font-medium text-yellow-100'>
                ₹ {total}
            </div>

            <div className='w-[100%]'>
                <Button
                    onClick={handleBuyCourse}
                    variant='variant1'
                    className="w-full"
                >
                    Buy Now
                </Button>
            </div>
        </div>
    )
}

export default RenderTotalAmount