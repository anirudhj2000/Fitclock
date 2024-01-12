import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../utils/types';
import Home from '../screens/Home';

const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='Home' component={Home} />
    </AppStack.Navigator>
  );
}

export default AppStackNavigator;
