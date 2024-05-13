import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInformation: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInformation(state, action) {
            state.userInformation = action.payload;
        }
    }
});

export const { setUserInformation } = userSlice.actions;
export default userSlice.reducer;