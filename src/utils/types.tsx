// Navigation Types

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Circuits: undefined;
};

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
