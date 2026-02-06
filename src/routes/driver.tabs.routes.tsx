import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { DriverBottomTabsParamsList } from '~/@types';
import assets from '../assets';
import { colors } from '../global';
import DriverDocumentsRoutes from './driver.documents.routes';
import DriverHomeRoutes from './driver.home.routes';
import DriverProfileRoutes from './driver.profile.routes';

const Tab = createBottomTabNavigator<DriverBottomTabsParamsList>();

const DriverRoutes: React.FC = () => {
  const {
    home,
    home_outline,
    documents,
    documents_outline,
    profile,
    profile_outline,
  } = assets.icons;

  const getTabBarVisibility = (route: Partial<Route<string>>) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const screensWithTabBar = ['Home', 'Profile', 'Documents'];
    if (!routeName || screensWithTabBar.includes(routeName)) {
      return 'flex';
    }
    return 'none';
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text10,
      }}
    >
      <Tab.Screen
        name="DriverHomeRoutes"
        component={DriverHomeRoutes}
        options={({ route }) => ({
          tabBarLabel: '',
          tabBarStyle: {
            display: getTabBarVisibility(route),
            ...styles.tabBar,
          },
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? home : home_outline}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="DriverDocumentsRoutes"
        component={DriverDocumentsRoutes}
        options={({ route }) => ({
          tabBarLabel: '',
          tabBarStyle: {
            display: getTabBarVisibility(route),
            ...styles.tabBar,
          },
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? documents : documents_outline}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="DriverProfileRoutes"
        component={DriverProfileRoutes}
        options={({ route }) => ({
          tabBarLabel: '',
          tabBarStyle: {
            display: getTabBarVisibility(route),
            ...styles.tabBar,
          },
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? profile : profile_outline}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    paddingBottom: 8,
    paddingTop: 8,
  },
});

export default DriverRoutes;
