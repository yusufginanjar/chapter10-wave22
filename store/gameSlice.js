import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    round: 1,
    set: 1,
    history: [],
    playingScore : 0,
}


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        nextRound: (state) => {
            state.round++;
        },
        nextSet: (state) => {
            state.set++;
        },
        addHistory: (state, action) => {
            state.history.push(action.payload);
        },
        resetHistory: (state) => {
            state.history = [];
        },
        resetRound: (state) => {
            state.round = 0;
        },
        resetSet: (state) => {
            state.set = 1;
        },
        win: (state) => {
            state.playingScore += 100;
        },
        lose: (state) => {
            state.playingScore -= 70;
        }
    }
});

export const { nextRound, nextSet, addHistory, resetHistory, resetRound, resetSet, win, lose } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;