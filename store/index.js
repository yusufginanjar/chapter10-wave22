import { configureStore } from '@reduxjs/toolkit';
import { statusReducer } from './statusSlice';
import { loginReducer } from './loginSlice';
import { gameReducer } from './gameSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    login: loginReducer,
    game: gameReducer,
  },});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);