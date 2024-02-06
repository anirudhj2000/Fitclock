import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import type { BlurViewProps } from 'expo-blur';
import getBackgroundColor from 'expo-blur/build/getBackgroundColor';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const { height, width } = Dimensions.get('window');

class LegacyAndroidBlurView extends React.Component<BlurViewProps> {
  render() {
    const { tint = 'default', intensity = 70, style, ...props } = this.props;
    const backgroundColor = '#038282' + '88';
    return <View {...props} style={[style, { backgroundColor }]} />;
  }
}

export const PBlurView: React.FC<BlurViewProps> | typeof LegacyAndroidBlurView =
  Platform.OS === 'ios' ? BlurView : LegacyAndroidBlurView;

interface BottomNavigatorInterface {
  selected: number;
  onClick: (index: number) => void;
}

const BottomNavigator = ({ selected = 0, onClick }: BottomNavigatorInterface) => {
  return (
    <PBlurView
      intensity={100}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.5,
        height: height * 0.07,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.secondary,
        paddingHorizontal: '2.5%',
      }}
      tint={'regular'}
    >
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '5%',
          backgroundColor: selected == 0 ? '#236666' : 'transparent',
          borderRadius: 8,
        }}
        onPress={() => {
          onClick(0);
        }}
      >
        <Entypo name='home' size={24} color={selected == 0 ? colors.primary : colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '5%',
          backgroundColor: selected == 1 ? '#236666' : 'transparent',
          borderRadius: 8,
        }}
        onPress={() => {
          onClick(1);
        }}
      >
        <Ionicons
          name='add-circle-sharp'
          size={24}
          color={selected == 1 ? colors.primary : colors.secondary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '5%',
          backgroundColor: selected == 2 ? '#236666' : 'transparent',
          borderRadius: 8,
        }}
        onPress={() => {
          onClick(2);
        }}
      >
        <Ionicons name='play' size={24} color={selected == 2 ? colors.primary : colors.secondary} />
      </TouchableOpacity>
    </PBlurView>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
