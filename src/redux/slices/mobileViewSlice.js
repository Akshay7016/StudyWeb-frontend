import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false
};

const mobileViewSlice = createSlice({
    name: "mobileView",
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    }
});

export const { setIsOpen } = mobileViewSlice.actions;
export default mobileViewSlice.reducer;