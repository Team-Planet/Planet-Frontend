import { createSlice, current } from "@reduxjs/toolkit";
import { moveCard } from "../services/cardService";
import BoardList from "../components/BoardList";

const initialState = {
  userBoards: [],
  currentBoard: null,
  boardLists: [],
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
    },
    createBoardList(state, action) {
      state.currentBoard.lists.push(action.payload);
    },
  },
});

export const {
  setUserBoards,
  setCurrentBoard,
  changeCardLabel,
  createBoardList,
} = boardSlice.actions;
export default boardSlice.reducer;
