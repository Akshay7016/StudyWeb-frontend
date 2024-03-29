import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import cartReducer from './slices/cartSlice';
import courseReducer from './slices/courseSlice';
import viewCourseReducer from "./slices/viewCourseSlice";
import mobileViewReducer from './slices/mobileViewSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        cart: cartReducer,
        course: courseReducer,
        viewCourse: viewCourseReducer,
        mobileView: mobileViewReducer
    }
});