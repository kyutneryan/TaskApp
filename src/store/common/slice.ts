import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logOut } from '../commonActions';

interface CommonState {
  isLoading: boolean;
}

const initialState: CommonState = {
  isLoading: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logOut, () => initialState);
  },
});

export const { setGlobalLoading } = commonSlice.actions;

export default commonSlice.reducer;
