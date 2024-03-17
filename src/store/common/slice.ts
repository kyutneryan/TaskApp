import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logOut } from '../commonActions';

interface CommonState {
  isLoading: boolean;
  productSearchValue: string;
}

const initialState: CommonState = {
  isLoading: false,
  productSearchValue: '',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProductSearchValue: (state, action: PayloadAction<string>) => {
      state.productSearchValue = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logOut, () => initialState);
  },
});

export const { setGlobalLoading, setProductSearchValue } = commonSlice.actions;

export default commonSlice.reducer;
