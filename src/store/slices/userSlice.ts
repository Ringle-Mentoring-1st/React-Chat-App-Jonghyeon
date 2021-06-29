import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
  jwtToken: string;
  userProfile: string;
  message: string;
}

const initialState = {
  jwtToken: '',
  userProfile: '',
  message: '',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<string>) => {
      state.userProfile = action.payload;
    },
    SecondSaga: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setJwtToken, setUserProfile, SecondSaga } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
