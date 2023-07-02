import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";

const {
    UPDATE_DISPLAY_PICTURE_API,
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
}