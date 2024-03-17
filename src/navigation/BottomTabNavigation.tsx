import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesIcon from '../assets/icons/bottom-tabs/Categories.svg';
import CategoriesActiveIcon from '../assets/icons/bottom-tabs/CategoriesActive.svg';
import HomeScreenIcon from '../assets/icons/bottom-tabs/Home.svg';
import HomeScreenActiveIcon from '../assets/icons/bottom-tabs/HomeActive.svg';
import ProfileIcon from '../assets/icons/bottom-tabs/Profile.svg';
import ProfileActiveIcon from '../assets/icons/bottom-tabs/ProfileActive.svg';
import WishListIcon from '../assets/icons/bottom-tabs/WishList.svg';
import WishListActiveIcon from '../assets/icons/bottom-tabs/WishListActive.svg';
import { MainHeader } from '../components/organism';
import { Categories, Home, Profile, WishList } from '../screens';
import { COLORS } from '../utils/constants';
import { moderateScale, verticalScale } from '../utils/scale';

export type BottomTabStackParams = {
  HomeScreen: undefined;
  Categories: undefined;
  WishList: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<BottomTabStackParams>();

export type BottomTabNavigatorProp = BottomTabNavigationProp<BottomTabStackParams, 'HomeScreen'>;

export const BottomTabNavigation = () => {
  const renderIcon = useCallback((screen: keyof BottomTabStackParams, focused: boolean) => {
    switch (screen) {
      case 'HomeScreen':
        return focused ? <HomeScreenActiveIcon /> : <HomeScreenIcon />;
      case 'Categories':
        return focused ? <CategoriesActiveIcon /> : <CategoriesIcon />;
      case 'WishList':
        return focused ? <WishListActiveIcon /> : <WishListIcon />;
      case 'Profile':
        return focused ? <ProfileActiveIcon /> : <ProfileIcon />;
    }
  }, []);

  return (
    <Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBarStyle,
        header: () => <MainHeader hasBack={false} />,
      }}>
      <Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => renderIcon('HomeScreen', focused),
        }}
      />
      <Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ focused }) => renderIcon('Categories', focused),
        }}
      />
      <Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({ focused }) => renderIcon('WishList', focused),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => <MainHeader hasBack={false} hasSearch={false} />,
          tabBarIcon: ({ focused }) => renderIcon('Profile', focused),
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: '400',
    fontSize: moderateScale(10),
    lineHeight: moderateScale(12),
  },
  tabBarStyle: { borderTopWidth: 0, paddingBottom: verticalScale(2) },
});
