import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { AuthNavigator } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';
import { UserService } from '../api/services';
import { Loading } from '../components/atom';
import { getIsLoading, getIsLoggedIn, setUser, useAppDispatch, useAppSelector } from '../store';
import { QUERY_KEY } from '../utils/constants';

export const AppNavigation = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isGlobalLoading = useAppSelector(getIsLoading);

  const {
    isLoading,
    data: user,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEY.getMe],
    queryFn: UserService.getMe,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
    }
  }, [dispatch, isSuccess, user]);

  return (
    <>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigator />}
      <Loading visible={isGlobalLoading || isLoading} />
      <Toast position="top" topOffset={insets.top} />
    </>
  );
};
