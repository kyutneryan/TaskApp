import { RootState } from '../main';

export const getMeSelector = (state: RootState) => state.user.user;
