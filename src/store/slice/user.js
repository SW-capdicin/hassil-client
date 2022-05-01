import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  id: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.id = action.payload.id;
      // state = {
      //   ...state,
      //   id: action.payload.id,
      //   isLoggedIn: action.payload.isLoggedIn,
      // };
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
