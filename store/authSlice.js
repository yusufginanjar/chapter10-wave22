import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    email: '',
    bio: '',
    score: 0,
    url: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.bio = action.payload.bio;
            state.score = action.payload.score;
            state.url = action.payload.url;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('bio', action.payload.bio);
            localStorage.setItem('score', action.payload.score);
            localStorage.setItem('url', action.payload.url);
        },
        logout: (state) => {
            state.username = '';
            state.email = '';
            state.bio = '';
            state.score = 0;
            state.url = '';
            localStorage.setItem('isAuthenticated', 'false');
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("bio");
            localStorage.removeItem("score");
            localStorage.removeItem("url");
        }
    }
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;