import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Maybe } from '../../models/common';
import { logOut } from '../commonActions';

interface AuthState {
  token: Maybe<string>;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsLoggedIn: state => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(logOut, () => initialState);
  },
});

export const { setIsLoggedIn, setToken } = authSlice.actions;

export default authSlice.reducer;
