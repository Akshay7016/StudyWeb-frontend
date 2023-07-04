const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses"
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifySignature"
};

// RATINGS AND REVIEWS ENDPOINTS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getAllRatingAndReview"
};

// CATEGORIES ENDPOINTS
export const categoriesEndpoints = {
    CATEGORIES_API: BASE_URL + "/course/getAllCategories",
};

// CATALOG PAGE ENDPOINTS
export const catalogDataEndpoints = {
    CATALOG_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// SETTINGS PAGE ENDPOINTS
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// CONTACT US PAGE ENDPOINTS
export const contactUsEndpoints = {
    CONTACT_US_API: BASE_URL + "/reach/contact"
};