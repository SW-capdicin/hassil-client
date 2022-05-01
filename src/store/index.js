import { configureStore } from '@reduxjs/toolkit';
import { userReducer, headerReducer } from './reducers';

export const store = configureStore({
  reducer: {
    user: userReducer,
    header: headerReducer,
  },
});
