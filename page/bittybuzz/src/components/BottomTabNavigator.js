import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'; // Image 컴포넌트 임포트
import MainScreen from '../screens/MainScreen';
import SummaryScreen from '../screens/SummaryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VoteListScreen from '../screens/VoteListScreen';
import PollSalesScreen from '../screens/PollSalesScreen'; 
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#ff99cc',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = require('../assets/icons/news-butt.png');
          } else if (route.name === 'Summary') {
            iconName = require('../assets/icons/summary-butt.png');
          } else if (route.name === 'Profile') {
            iconName = require('../assets/icons/profile-butt.png');
          } else if (route.name === 'Vote') {
            iconName = require('../assets/icons/positive-vote.png');
          }

          return <Image source={iconName} style={{ width: size, height: size }} />;
        },
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
      <Tab.Screen name="Vote" component={VoteListScreen} />
      <Tab.Screen name="PollSales" component={PollSalesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
