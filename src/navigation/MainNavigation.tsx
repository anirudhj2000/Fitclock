import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../utils/types';
import Home from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateCircuits from '../screens/CreateCircuits';
import Circuits from '../screens/Circuits';
import CircuitPlayer from '../screens/CircuitPlayer';
import CircuitEndScreen from '../components/CircuitEndModal';

const AppStack = createNativeStackNavigator<AppStackParamList>();

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

export default AppStackNavigator;
