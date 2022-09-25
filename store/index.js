import { configureStore } from '@reduxjs/toolkit';
import { statusReducer } from './statusSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    status: statusReducer,
  },});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);