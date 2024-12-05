// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInSignUpScreen from '../screens/SignInSignUpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import NewsDetail from '../screens/NewsDetail';
import VoteListScreen from '../screens/VoteListScreen';
import VoteScreen from '../screens/VoteScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignInSignUp">
      <Stack.Screen
        name="SignInSignUp"
        component={SignInSignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ title: 'News Detail' }} />
      <Stack.Screen name="VoteList" component={VoteListScreen} options={{ title: 'Vote Topics' }} />
      <Stack.Screen name="Vote" component={VoteScreen} options={{ title: 'Vote' }} />
    </Stack.Navigator>
  );
}
