import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.error = null;
        },
        clearUserData: (state) => {
            state.userData = null;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setUserData, clearUserData, setLoading, setError, clearError } = userSlice.actions;
export default userSlice.reducer;