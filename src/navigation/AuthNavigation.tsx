import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../utils/types';
import Login from '../screens/Login';

const LoginStack = createNativeStackNavigator<AuthStackParamList>();

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name='Login' component={Login} />
    </LoginStack.Navigator>
  );
}

export default LoginStackNavigator;
