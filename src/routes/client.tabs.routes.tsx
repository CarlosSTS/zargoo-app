import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import { ClientBottomTabsParamsList } from '~/@types';
import assets from '../assets';
import { colors } from '../global';
import ClientHomeRoutes from './client.home.routes';
import ClientTripsRoutes from './client.trips.routes';
import ClientProfileRoutes from './client.profile.routes';

const Tab = createBottomTabNavigator<ClientBottomTabsParamsList>();

const ClientRoutes: React.FC = () => {
  const { home, home_outline, profile, profile_outline } = assets.icons;

  const getTabBarVisibility = (route: Partial<Route<string>>) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const screensWithTabBar = ['Home', 'Profile', 'Trips'];
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
        name="ClientHomeRoutes"
        component={ClientHomeRoutes}
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
        name="ClientTripsRoutes"
        component={ClientTripsRoutes}
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
        name="ClientProfileRoutes"
        component={ClientProfileRoutes}
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

export default ClientRoutes;
