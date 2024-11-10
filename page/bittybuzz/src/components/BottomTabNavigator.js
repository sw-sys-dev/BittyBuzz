import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import SummaryScreen from '../screens/SummaryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewsDetail from '../screens/NewsDetail';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components

        tabBarActiveTintColor: '#0174DF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="NewsDetail" component={NewsDetail} />
    </Tab.Navigator>
  );
}
