import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Login } from '../screens';

export type AuthStackParams = {
  Login: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export type AuthNavigatorProp = NativeStackNavigationProp<AuthStackParams>;

export const AuthNavigator = () => {
  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};
