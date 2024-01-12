import React from 'react';
import { Text } from 'react-native';
import { colors } from '../utils/colors';

interface AppTitleInterface {
  fontSize: number;
}

const AppTitle = ({ fontSize }: AppTitleInterface) => {
  return (
    <Text style={{ color: colors.primary, fontSize: fontSize }}>
      <Text style={{ color: colors.secondary }}>FIT</Text>CLOCK
    </Text>
  );
};

export default AppTitle;
