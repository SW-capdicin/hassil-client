import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: undefined,
  nickname: undefined,
  isLoggedIn: true,
  isSignup: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { id, nickname, isLoggedIn, isSignup } = action.payload;
      state.id = id;
      state.nickname = nickname;
      state.isLoggedIn = isLoggedIn;
      state.isSignup = isSignup;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
