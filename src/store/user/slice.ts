import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logOut } from '../commonActions';

interface UserState {
  user: any;
  confirmationStatus: any;
  fcmToken: any;
}

const initialState: UserState = {
  user: null,
  confirmationStatus: null,
  fcmToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logOut, () => initialState);
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
