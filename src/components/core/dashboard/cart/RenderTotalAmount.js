import React from 'react'
import { useSelector } from 'react-redux';

import Button from "../../../common/Button";

const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought this courses: ", courses);
        // TODO: API integrate which takes to payment gateway
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