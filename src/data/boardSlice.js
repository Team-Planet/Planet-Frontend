import { createSlice, current } from "@reduxjs/toolkit";
import { moveCard } from "../services/cardService";

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
        },
        moveCardForward(state, action) {
            const currentBoard = state.currentBoard;
            const oldList = currentBoard.lists.find(l => l.id === action.payload.oldListId);
            const newList = currentBoard.lists.find(l => l.id === action.payload.newListId);

            const card = oldList.cards.find(c => c.id === action.payload.cardId);
            card.order = action.payload.newOrder;
            oldList.cards.splice(action.payload.sourceIndex, 1);
            newList.cards.splice(action.payload.destinationIndex, 0, card);
            newList.cards.sort((a, b) => a.order - b.order);
            
            state.currentBoard = currentBoard;
        },
        moveCardBackward(state, action) {
            const currentBoard = state.currentBoard;
            const oldList = currentBoard.lists.find(l => l.id === action.payload.oldListId);
            const newList = currentBoard.lists.find(l => l.id === action.payload.newListId);

            const card = newList.cards.find(c => c.id === action.payload.cardId);
            card.order = action.payload.oldOrder;
            newList.cards.splice(action.payload.destinationIndex, 1);
            oldList.cards.splice(action.payload.sourceIndex, 0, card);
            oldList.cards.sort((a, b) => a.order - b.order);

            state.currentBoard = currentBoard;
        }
    }
});

export const { setUserBoards, setCurrentBoard, setListCards, moveCardForward, moveCardBackward } = boardSlice.actions;
export default boardSlice.reducer;