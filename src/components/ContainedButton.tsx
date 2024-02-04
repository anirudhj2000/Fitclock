import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';

interface OutlinedButtonInterface {
  title: string;
  onClick: () => void;
}

const ContainedButton = ({ title, onClick }: OutlinedButtonInterface) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.secondary,
        paddingVertical: '2.5%',
        paddingHorizontal: '7.5%',
      }}
      onPress={onClick}
    >
      <Text style={{ color: colors.primary }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ContainedButton;

const styles = StyleSheet.create({});
