import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Maybe } from '../../models/common';
import { IUser } from '../../models/user';
import { logOut } from '../commonActions';

interface UserState {
  user: Maybe<IUser>;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logOut, () => initialState);
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
