import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
};

// status untuk menunjukkan loading page sudah selesai atau belum
export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        processing: (state) => {
            state.status = 'loading';
        },
        success: (state) => {
            state.status = 'idle';
        }
    }
});

export const { processing, success } = statusSlice.actions;

export const statusReducer = statusSlice.reducer;