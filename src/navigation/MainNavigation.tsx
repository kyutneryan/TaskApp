import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { BottomTabNavigation } from './BottomTabNavigation';

export type MainStackParams = {
  BottomTabNavigation: undefined;
};
export type MainNavigatorProp = NativeStackNavigationProp<MainStackParams, 'BottomTabNavigation'>;

const { Navigator, Screen } = createNativeStackNavigator<MainStackParams>();

export const MainNavigation = () => {
  return (
    <Navigator initialRouteName="BottomTabNavigation">
      <Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
