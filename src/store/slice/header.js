import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showUserIcon: true,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setShowUserIcon: (state, action) => {
      state.showUserIcon = action.payload.showUserIcon;
    },
  },
});

export const { setShowUserIcon } = headerSlice.actions;
export default headerSlice.reducer;
