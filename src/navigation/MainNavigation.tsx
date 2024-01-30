import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../utils/types';
import Home from '../screens/Home';
import Circuits from '../screens/Circuits';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='Home' component={Home} />
      <AppStack.Screen name='Circuits' component={Circuits} />
    </AppStack.Navigator>
  );
}

export default AppStackNavigator;
