import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { AuthNavigator } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';
import { Loading } from '../components/atom';
import { getIsLoading, getIsLoggedIn, useAppSelector } from '../store';

export const AppNavigation = () => {
  const insets = useSafeAreaInsets();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isGlobalLoading = useAppSelector(getIsLoading);

  return (
    <>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigator />}
      <Loading visible={isGlobalLoading} />
      <Toast position="top" topOffset={insets.top} />
    </>
  );
};
