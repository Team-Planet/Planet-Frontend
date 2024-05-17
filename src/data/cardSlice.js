import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentCard: null,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCurrentCard(state, action) {
      state.currentCard = action.payload;
    },
  },
});

export const { setCurrentCard } = cardSlice.actions;
export default cardSlice.reducer;
