import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';

interface OutlinedButtonInterface {
  title: string;
  onClick: () => void;
}

const OutlinedButton = ({ title, onClick }: OutlinedButtonInterface) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: colors.secondary,
        paddingVertical: '2.5%',
        paddingHorizontal: '7.5%',
        marginHorizontal: '2.5%',
      }}
      onPress={onClick}
    >
      <Text style={{ color: colors.secondary }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({});
