import { RootState } from '../main';

export const getWishLists = (state: RootState) => state.wishList.wishList;
