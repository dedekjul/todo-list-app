import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.name = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
