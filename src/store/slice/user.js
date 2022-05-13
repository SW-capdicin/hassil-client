import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  type: 0,
  name: '',
  nickname: '',
  phoneNumber: '',
  bankName: '',
  bankAccount: '',
  point: 0,
  isLoggedIn: false,
  isSignup: false,
  loginCheck: true,
  signupCkeck: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.phoneNumber = action.payload.phoneNumber;
      state.point = action.payload.point;
      state.bankName = action.payload.bankName;
      state.bankAccount = action.payload.bankAccount;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isSignup = action.payload.isSignup;
      state.loginCheck = true;
      state.signupCkeck = true;
    },
    updateUser: (state, action) => {
      state.type = action.payload.type;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.phoneNumber = action.payload.phoneNumber;
      state.bankName = action.payload.bankName;
      state.bankAccount = action.payload.bankAccount;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isSignup = action.payload.isSignup;
    },
    setEmptyUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.loginCheck = false;
    },
    setNoSignupUser: (state, action) => {
      state.id = action.payload.id;
      state.isLoggedIn = true;
      state.loginCheck = true;
      state.signupCkeck = false;
      state.isSignup = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  setUserInfo,
  logout,
  updateUser,
  setEmptyUser,
  setNoSignupUser,
} = userSlice.actions;
export default userSlice.reducer;
