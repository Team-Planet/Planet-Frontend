import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import boardReducer from "./boardSlice";
import cardReducer from "./cardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    card: cardReducer,
  },
});
