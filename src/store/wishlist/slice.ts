import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../models/common';
import { logOut } from '../commonActions';

interface UserState {
  wishList: Array<IProduct>;
}

const initialState: UserState = {
  wishList: [],
};

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<IProduct>) => {
      state.wishList.push(action.payload);
    },
    removeFromWishList: (state, action: PayloadAction<IProduct>) => {
      state.wishList = state.wishList.filter(({ id }) => action.payload.id === id);
    },
  },
  extraReducers: builder => {
    builder.addCase(logOut, () => initialState);
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
