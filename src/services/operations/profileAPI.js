import { toast } from "react-hot-toast";

import { setUser, setLoading } from "redux/slices/profileSlice";

import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

import { logout } from "./authAPI";

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndpoints;

export const getUserDetails = (token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "GET",
                GET_USER_DETAILS_API,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            console.log("getUserDetails services", response);
            dispatch(setUser(response?.data?.data));
        } catch (error) {
            // TODO: remove logout functionality/check why it is needed?
            dispatch(logout(navigate));
            toast.error(error?.response?.data?.message);
        };
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
};

export const getUserEnrolledCourses = async (token) => {
    let result = [];
    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        result = response?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    return result;
}

export const getInstructorDashboardDetails = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_DATA_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        result = response.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};