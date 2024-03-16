import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth/slice';
import CommonReducer from './common/slice';
import UserReducer from './user/slice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  common: CommonReducer,
});

export default rootReducer;
