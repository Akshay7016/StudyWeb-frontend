import { useSelector } from "react-redux";

const Cart = () => {
    const { totalItems } = useSelector((state) => state.cart);

    return (
        <div>
            <div className='text-3xl font-medium text-richblack-5 mb-14'>
                Cart
            </div>

            <div className="text-richblack-400 font-semibold mb-4">
                {totalItems} Courses in Cart
            </div>

            <div className="w-full h-[1px] bg-richblack-500"></div>

            {
                totalItems > 0 ? (
                    <div>
                        {/* <RenderCartCourses />
                        <RenderTotalAmount /> */}
                    </div>
                ) : (
                    <div className="text-richblack-200 text-3xl text-center font-medium mt-12">
                        Your cart is empty
                    </div>
                )
            }
        </div>
    )
}

export default Cart;