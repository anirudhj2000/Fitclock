import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { images } from '../utils/consts';
import { colors } from '../utils/colors';
import { Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');
const CircuitCard = () => {
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
        style={{ height: height * 0.08, width: width * 0.35 }}
        source={{ uri: images[parseInt(Math.random() * 10 + '') % 5] }}
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
          Core Body Circuit
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.secondary }}>
          45 min
        </Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Feather name='edit-2' size={16} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default CircuitCard;
