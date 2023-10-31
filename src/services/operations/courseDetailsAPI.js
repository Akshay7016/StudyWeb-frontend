import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API
} = courseEndpoints;

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API);
        result = response.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "GET",
            COURSE_DETAILS_API,
            {
                courseId: courseId
            }
        );
        result = response.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        result = response.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    return result;
};

// add the course details
export const addCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            CREATE_COURSE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );
        toast.success("Course details added successfully");
        result = response.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

// edit the course details
export const editCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "PUT",
            EDIT_COURSE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );
        result = response.data?.data;
        toast.success("Course details updated successfully");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// create a section
export const createSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATE_SECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = response.data?.data;
        toast.success("Course section created");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// create a subsection
export const createSubSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATE_SUBSECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = response.data?.data;
        toast.success("Lecture added");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// update a section
export const updateSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_SECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = response.data?.data;
        toast.success("Course section updated");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }

    toast.dismiss(toastId);
    return result;
};

// update a subSection
export const updateSubSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_SUBSECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = response.data?.data;
        toast.success("Lecture updated");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// delete a section
export const deleteSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "DELETE",
            DELETE_SECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = response.data?.data;
        toast.success("Course section deleted");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// delete a subSection
export const deleteSubSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            'DELETE',
            DELETE_SUBSECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = response.data?.data;
        toast.success("Lecture deleted");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
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

// delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        await apiConnector(
            "DELETE",
            DELETE_COURSE_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        toast.success("Course deleted");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
};

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId
            },
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

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = false;

    try {
        await apiConnector(
            "PUT",
            LECTURE_COMPLETION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = true;
        toast.success("Lecture completed");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};

// create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = false;

    try {
        await apiConnector(
            "POST",
            CREATE_RATING_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        result = true;
        toast.success("Rating added");
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
};