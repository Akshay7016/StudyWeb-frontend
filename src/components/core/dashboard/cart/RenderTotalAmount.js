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
        <div>
            <div>
                Total:
            </div>

            <div>
                Rs {total}
            </div>

            <div>
                <Button
                    onClick={handleBuyCourse}
                    variant='variant1'
                >
                    Buy Now
                </Button>
            </div>
        </div>
    )
}

export default RenderTotalAmount