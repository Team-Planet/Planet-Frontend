import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    currentNotification: null
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        pushNotification(state, action) {
            if(state.currentNotification === null) {
                state.currentNotification = action.payload;
                return;
            }

            state.notifications.push(action.payload);
        },
        popNotification(state, action) {
            state.currentNotification = state.notifications.shift();
        }
    }
});

export const {pushNotification, popNotification} = notificationSlice.actions;
export default notificationSlice.reducer;