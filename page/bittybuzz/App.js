import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';  // ToastProvider 임포트
import AppNavigator from './src/components/AppNavigator';  // 네비게이션 컴포넌트 임포트

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
}
