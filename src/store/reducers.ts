import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth/slice';
import UserReducer from './user/slice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
});

export default rootReducer;
