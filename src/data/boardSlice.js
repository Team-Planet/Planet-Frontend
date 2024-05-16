import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    userBoards: [],
    currentBoard: null
}

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setUserBoards(state, action) {
            state.userBoards = action.payload;
        },
        setCurrentBoard(state, action) {
            state.currentBoard = action.payload;
        },
        setListCards(state, action) {
            const currentBoard = state.currentBoard;
            currentBoard.lists.find(l => l.id === action.payload.listId).cards = action.payload.cards;
            state.currentBoard = currentBoard;
        }
    }
});

export const { setUserBoards, setCurrentBoard, setListCards } = boardSlice.actions;
export default boardSlice.reducer;