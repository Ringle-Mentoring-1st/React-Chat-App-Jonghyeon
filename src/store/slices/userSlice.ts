import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
  jwtToken: string | null;
  userProfile: any | null;
  message: string;
}

const initialState: UserState = {
  jwtToken: null,
  userProfile: null,
  message: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.jwtToken = initialState.jwtToken;
      state.userProfile = initialState.userProfile;
      state.message = initialState.message;
    },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
    },
    setUserProfile: (
      state,
      action: PayloadAction<{ uid: string; email: string; nickName: string }>
    ) => {
      state.userProfile = action.payload;
    },
    SecondSaga: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { logout, setJwtToken, setUserProfile, SecondSaga } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
