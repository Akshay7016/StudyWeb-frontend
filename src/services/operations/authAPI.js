import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../redux/slices/authSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";

const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSWORDTOKEN_API, RESETPASSWORD_API } = authEndpoints;

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            await apiConnector("POST", SENDOTP_API, {
                email
            });

            toast.success("OTP sent successfully");
            navigate("/verify-email");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        };

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
};

export const signUp = (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    otp,
    navigate
) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            });

            toast.success("Signup successful");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message);
            if (error?.response?.data?.message !== "Invalid OTP") {
                navigate("/signup");
            }
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
};

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            });

            toast.success("Login successful");
            dispatch(setToken(response?.data?.token));

            const userImage = response?.data?.user?.image
                ? response?.data?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response?.data?.user, image: userImage }));

            localStorage.setItem("user", JSON.stringify({ ...response?.data?.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(response?.data?.token));

            navigate("/dashboard/my-profile");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
};

export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out");
        navigate("/")
    }
};

export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            await apiConnector("POST", RESETPASSWORDTOKEN_API, { email });

            toast.success("Reset email sent");
            setEmailSent(true);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        dispatch(setLoading(false));
    }
};

export const resetPassword = (token, password, confirmPassword, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            await apiConnector("POST", RESETPASSWORD_API, {
                token,
                password,
                confirmPassword
            });

            toast.success("Password has been reset successfully");
            navigate("/login")
        } catch (error) {
            toast.error(error?.response?.data?.message);
            navigate("/login")
        }

        dispatch(setLoading(false));
    }
};