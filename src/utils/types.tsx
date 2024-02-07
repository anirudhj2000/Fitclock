import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';

// Navigation Types

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  CreateCircuits: undefined;
  Circuits: undefined;
};

export type AppStackScreenProps = NativeStackScreenProps<AppStackParamList>;

export type AppNavigationProp = NavigationProp<AppStackParamList>;

// Component Types

export type title = {
  title: string;
  focus: boolean;
};

export interface setObjectInterface {
  exercise: string;
  title: string;
  value: number;
  rest: number;
  type: string;
}
