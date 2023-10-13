import { toast } from "react-hot-toast";

import { setUser } from "redux/slices/profileSlice";

import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";

import { logout } from "./authAPI";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;



export const updateDisplayPicture = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            );

            toast.success("Profile picture updated successfully");
            dispatch(setUser(response?.data?.data));
            localStorage.setItem("user", JSON.stringify(response?.data?.data));
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
};

export const updateProfile = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            dispatch(setUser(response?.data?.data));
            localStorage.setItem("user", JSON.stringify(response?.data?.data));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
};

export const changePassword = async (token, formData) => {
    const toastId = toast.loading("Loading...");
    try {
        await apiConnector(
            "PUT",
            CHANGE_PASSWORD_API,
            formData,
            {
                Authorization: `Bearer ${token}`
            }
        );

        toast.success("Password changed successfully");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
};

export const deleteProfile = (token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            await apiConnector(
                "DELETE",
                DELETE_PROFILE_API,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            toast.success("Profile deleted successfully");
            dispatch(logout(navigate));
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}