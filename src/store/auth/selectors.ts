import { RootState } from '../main';

export const getToken = (state: RootState) => state.auth.token;
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getIsFirstTime = (state: RootState) => state.auth.isFirstTime;
