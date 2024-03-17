import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth/slice';
import CommonReducer from './common/slice';
import UserReducer from './user/slice';
import WishListReducer from './wishlist/slice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  common: CommonReducer,
  wishList: WishListReducer,
});

export default rootReducer;
