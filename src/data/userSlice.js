import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInformation: null,
    isAuthenticated: true
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInformation(state, action) {
            state.userInformation = action.payload;
        },
        authenticate(state) {
            state.isAuthenticated = true;
        },
        revoke(state) {
            state.isAuthenticated = false;
        }
    }
});

export const { setUserInformation, authenticate, revoke } = userSlice.actions;
export default userSlice.reducer;