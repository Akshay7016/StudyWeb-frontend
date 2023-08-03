import { toast } from "react-hot-toast";

// TODO: check where this logo is used
import logo from "../../assets/Logo/logo.png";
import { resetCart } from "../../redux/slices/cartSlice";
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints;

// Load the Razorpay SDK from the CDN
const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
};

// Buy the course
export const buyCourse = async (token, courses, user_details, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        // Loading the script of Razorpay SDK
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Razorpay SDK failed to load. Check your Internet Connection.");
            return;
        };

        // Initiating the order in backend
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {
                courses
            },
            {
                Authorization: `Bearer ${token}`
            }
        );

        // Opening the Razorpay SDK
        const options = {
            // TODO: add razorpay key
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data?.data?.currency,
            amount: `${orderResponse.data?.data?.amount}`,
            order_id: orderResponse.data?.data?.id,
            name: "StudyWeb",
            description: "Thank you for purchasing the course.",
            image: logo,
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
            },
            handler: (response) => {
                sendPaymentSuccessEmail(response, orderResponse.data?.data?.amount, token);
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();
        paymentObject.on("payment.failed", (response) => {
            toast.error("Oops! Payment Failed.");
        });
    } catch (error) {
        toast.error("Could not make the payment.")
    }
    toast.dismiss(toastId);
};

// verify the payment
const verifyPayment = async (bodyData, token, navigate, dispatch) => {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));
    try {
        await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`
            }
        );

        toast.success("Payment Successful. Check course in Enrolled Courses section");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
};

// send the payment success email
const sendPaymentSuccessEmail = async (response, amount, token) => {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`
            }
        );
    } catch (error) {
        toast.error("Error while sending payment successful email");
    }
};
