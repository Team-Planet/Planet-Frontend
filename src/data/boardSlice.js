import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userBoards: []
}

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setUserBoards(state, action) {
            state.userBoards = action.payload;
        },
    }
});

export const { setUserBoards } = boardSlice.actions;
export default boardSlice.reducer;