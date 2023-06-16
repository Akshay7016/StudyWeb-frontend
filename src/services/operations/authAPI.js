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
            const response = await apiConnector("POST", SENDOTP_API, {
                email
            });

            console.log("SENDOTP API RESPONSE...", response);
            // TODO: handle toast message for user already registered case based on status code. and redirect to login page

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");
        } catch (error) {
            console.log("SENDOTP API ERROR: ", error);
            toast.error("Could not send OTP");
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
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            });

            console.log("SIGNUP API RESPONSE...", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR:..... ", error);
            toast.error("Signup failed");
            navigate("/signup");
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

            console.log("LOGIN API RESPONSE...", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success("Login successful");
            dispatch(setToken(response?.data?.token));

            const userImage = response?.data?.user?.image
                ? response?.data?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response?.data?.user, image: userImage }));

            localStorage.setItem("token", JSON.stringify(response?.data?.token));

            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("LOGIN API ERROR...", error);
            toast.error("Login failed");
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
        // TODO: first set user in localStorage while login and add user in localStorage in profileSlice
        localStorage.removeItem("user");
        toast.success("Logged out");
        navigate("/")
    }
};

// TODO: check whether setEmailSent used in parent comp
export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, { email });

            console.log("RESET PASSWORD TOKEN API RESPONSE...", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            };

            toast.success("Reset email sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN API ERROR...", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    }
};

export const resetPassword = (token, password, confirmPassword) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                token,
                password,
                confirmPassword
            });

            console.log("RESET PASSWORD API RESPONSE...", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success("Password has been reset successfully");
        } catch (error) {
            console.log("RESET PASSWORD API ERROR...", error);
            toast.error("Unable to reset password");
        }

        dispatch(setLoading(false));
    }
};