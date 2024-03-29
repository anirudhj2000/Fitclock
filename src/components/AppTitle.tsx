import React from 'react';
import { Text } from 'react-native';
import { colors } from '../utils/colors';

interface AppTitleInterface {
  fontSize: number;
  text1: string;
  text2: string;
}

const AppTitle = ({ fontSize, text1, text2 }: AppTitleInterface) => {
  return (
    <Text style={{ color: colors.primary, fontSize: fontSize, fontFamily: 'Inter_400Regular' }}>
      <Text style={{ color: colors.secondary, fontWeight: 'bold', fontFamily: 'Inter_700Bold' }}>
        {text1}
      </Text>
      {text2}
    </Text>
  );
};

export default AppTitle;
