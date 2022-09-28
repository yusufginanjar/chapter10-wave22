import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rps: {
        played: false
    },
    portal2: {
        played: false,
        score: Math.floor(Math.random() * 10000)
    },
    zelda: {
        played: false,
        score: Math.floor(Math.random() * 10000)
    },
    mario: {
        played: false,
        score: Math.floor(Math.random() * 10000)
    }
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        playRPS: (state) => {
            state.rps.played = true;
        },
        playPortal2: (state) => {
            state.portal2.played = true;
        },
        playZelda: (state) => {
            state.zelda.played = true;
        },
        playMario: (state) => {
            state.mario.played = true;
        }
    }
});

export const { playRPS, playPortal2, playZelda, playMario } = gamesSlice.actions;

export const gamesReducer = gamesSlice.reducer;

