import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';

// Navigation Types

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  CreateCircuits: undefined;
  Circuits: undefined;
  CircuitPlayer: undefined;
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

export type AppDrawerParams = {
  App: NavigatorScreenParams<AppStackParamList>;
};

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AppDrawerParams>,
  DrawerScreenProps<AppStackParamList>
>;
