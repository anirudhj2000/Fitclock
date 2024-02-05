import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from './src/navigation/MainNavigation';
import { colors } from './src/utils/colors';
import LoginStackNavigator from './src/navigation/AuthNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useUserStore from './src/utils/store';
import Toast from 'react-native-toast-message';
import React from 'react';

export default function App() {
  let userData = useUserStore((state) => state.user);
  let updateUser = useUserStore((state) => state.updateUser);
  const [user, setUser] = React.useState<string | null>(null);

  // const [user, setUser] = React.useState<any>(
  //   useUserStore(state => state.user),
  // );

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    let data = await AsyncStorage.getItem('user');
    setUser(data);
    updateUser(data);
    console.log('user data', data);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Toast />
      <NavigationContainer>
        {userData ? <AppStackNavigator /> : <LoginStackNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
