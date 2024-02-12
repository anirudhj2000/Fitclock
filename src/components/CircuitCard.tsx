import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { images } from '../utils/consts';
import { colors } from '../utils/colors';
import { Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

interface CircuitsInterface {
  title: string;
  duration: number;
  onClick: () => void;
  onEdit: () => void;
}

const CircuitCard = ({ title, duration, onClick, onEdit }: CircuitsInterface) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '5%',
        height: height * 0.08,
        backgroundColor: colors.background,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Image
        style={{ height: height * 0.08, width: width * 0.3 }}
        source={{ uri: images[parseInt(Math.random() * 10 + '') % 3] }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginHorizontal: '5%',
          width: width * 0.35,
        }}
      >
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.primary }}>
          {title}
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.secondary }}>
          {Math.floor(duration / 60) + ' mins'}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: width * 0.2,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            onClick();
          }}
          style={{
            borderWidth: 0.5,
            borderColor: colors.secondary,
            padding: '10%',
            borderRadius: height * 0.1,
          }}
        >
          <Feather name='play' size={16} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onEdit();
          }}
          style={{
            borderWidth: 0.5,
            borderColor: colors.secondary,
            padding: '10%',
            borderRadius: height * 0.1,
          }}
        >
          <Feather name='edit-2' size={16} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircuitCard;
