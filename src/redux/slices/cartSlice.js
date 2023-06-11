import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalItems: (state, value) => {
            state.totalItems = value.payload;
        },
        // TODO: add to cart
        // TODO: remove from cart
        // TODO: clear cart
    }
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;