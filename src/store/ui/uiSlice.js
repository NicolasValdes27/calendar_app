import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: true
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
            console.log("sadasd23")
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        },
    }
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;