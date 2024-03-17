import { RootState } from '../main';

export const getIsLoading = (state: RootState) => state.common.isLoading;
export const getProductSearchValue = (state: RootState) => state.common.productSearchValue;
