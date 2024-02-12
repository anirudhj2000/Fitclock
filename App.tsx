import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/utils/colors';
import LoginStackNavigator from './src/navigation/AuthNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useUserStore from './src/utils/store';
import Toast from 'react-native-toast-message';
import React from 'react';
import { AppDrawerNavigator } from './src/navigation/MainNavigation';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  let userData = useUserStore((state) => state.user);
  let updateUser = useUserStore((state) => state.updateUser);
  const [user, setUser] = React.useState<string | null>(null);
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
  });

  useEffect(() => {
    fetchInfo();
    // NavigationBar.setVisibilityAsync('hidden');
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
        {userData ? <AppDrawerNavigator /> : <LoginStackNavigator />}
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
