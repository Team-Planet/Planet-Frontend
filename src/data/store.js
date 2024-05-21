import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import boardReducer from "./boardSlice";
import cardReducer from "./cardSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    card: cardReducer,
    notification: notificationReducer
  },
});
