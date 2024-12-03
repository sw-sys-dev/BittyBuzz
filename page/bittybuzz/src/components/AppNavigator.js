// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInSignUpScreen from '../screens/SignInSignUpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import NewsDetail from '../screens/NewsDetail';
import VoteScreen from '../screens/VoteScreen';
import VoteListScreen from '../screens/VoteListScreen';


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
      <Stack.Screen name="VoteList" component={VoteListScreen} options={{ title: '투표 주제 리스트' }} />
      <Stack.Screen name="Vote" component={VoteScreen} options={{ title: '투표하기' }} />
    </Stack.Navigator>
  );
}
