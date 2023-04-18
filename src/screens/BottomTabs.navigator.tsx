import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home.screen';
import { List } from './TodoList.screen';
import { HomeIcon, ListIcon } from '../components/Icons';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colorDarkGrey,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          }

          if (route.name === 'List') {
            return <ListIcon color={color} size={size} />;
          }

          return null;
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: 'Add new Todo' }}
      />
      <BottomTabs.Screen
        name="List"
        component={List}
        options={{ title: 'Created Todos' }}
      />
    </BottomTabs.Navigator>
  );
};
