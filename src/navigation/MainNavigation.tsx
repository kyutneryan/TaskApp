import React, { useEffect } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { BottomTabNavigation } from './BottomTabNavigation';
import { UserService } from '../api/services';
import { MainHeader } from '../components/organism';
import { SearchScreen } from '../screens/common/SearchScreen';
import { setUser, useAppDispatch } from '../store';
import { QUERY_KEY } from '../utils/constants';

export type MainStackParams = {
  BottomTabNavigation: undefined;
  SearchScreen: undefined;
};
export type MainNavigatorProp = NativeStackNavigationProp<MainStackParams, 'BottomTabNavigation'>;

const { Navigator, Screen } = createNativeStackNavigator<MainStackParams>();

export const MainNavigation = () => {
  const dispatch = useAppDispatch();
  const { isSuccess, data } = useQuery({
    queryKey: [QUERY_KEY.getMe],
    queryFn: UserService.getMe,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch, isSuccess]);

  return (
    <Navigator initialRouteName="BottomTabNavigation">
      <Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ header: () => <MainHeader hasSearch={false} /> }}
      />
    </Navigator>
  );
};
