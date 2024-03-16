import React from 'react';
import { Text } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export type MainStackParams = {
  BottomTabNavigation: undefined;
};
export type MainNavigatorProp = NativeStackNavigationProp<MainStackParams>;

const { Navigator, Screen } = createNativeStackNavigator<MainStackParams>();

export const MainNavigation = () => {
  return (
    <Navigator initialRouteName="BottomTabNavigation">
      <Screen name="BottomTabNavigation" component={() => <Text>bottomtab</Text>} />
    </Navigator>
  );
};
