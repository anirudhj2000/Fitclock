import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppDrawerParams, AppStackParamList } from '../utils/types';
import Home from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateCircuits from '../screens/CreateCircuits';
import Circuits from '../screens/Circuits';
import CircuitPlayer from '../screens/CircuitPlayer';
import CircuitEndScreen from '../components/CircuitEndModal';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawerComponent from '../components/AppDrawer';

const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppDrawer = createDrawerNavigator<AppDrawerParams>();

function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='Home' component={Home} />
      <AppStack.Screen name='Circuits' component={Circuits} />
      <AppStack.Screen name='CreateCircuits' component={CreateCircuits} />
      <AppStack.Screen name='CircuitPlayer' component={CircuitPlayer} />
    </AppStack.Navigator>
  );
}

export const AppDrawerNavigator = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <AppDrawerComponent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <AppDrawer.Screen name='App' component={AppStackNavigator} />
    </AppDrawer.Navigator>
  );
};
