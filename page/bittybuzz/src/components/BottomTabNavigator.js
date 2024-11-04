import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import SummaryScreen from '../screens/SummaryScreen';
import ProfileScreen from '../screens/ProfileScreen';



const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components

        tabBarActiveTintColor: '#FFB100',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
