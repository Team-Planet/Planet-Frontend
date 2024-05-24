import { createSlice, current } from "@reduxjs/toolkit";
import { moveCard } from "../services/cardService";

const initialState = {
  userBoards: [],
  currentBoard: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setUserBoards(state, action) {
      state.userBoards = action.payload;
    },
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    }
  },
});

export const {
  setUserBoards,
  setCurrentBoard,
  changeCardLabel,
} = boardSlice.actions;
export default boardSlice.reducer;
