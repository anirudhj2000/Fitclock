import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const { height, width } = Dimensions.get('window');

const startWidth = width * 0.025;

const pathStart = Skia.Path.Make();
pathStart.moveTo(startWidth, height * 0.06);
pathStart.lineTo(startWidth, height * 0.1);
pathStart.close();

const pathMid = Skia.Path.Make();
pathMid.moveTo(startWidth, 0);
pathMid.lineTo(startWidth, height * 0.04);
pathMid.moveTo(startWidth, height * 0.06);
pathMid.lineTo(startWidth, height * 0.1);
pathMid.close();

const pathEnd = Skia.Path.Make();
pathEnd.moveTo(startWidth, 0);
pathEnd.lineTo(startWidth, height * 0.04);
pathEnd.close();

interface ExerciseCardInterface {
  type: string;
  onEdit: () => void;
  onDelete: () => void;
  title: string;
  exerciseType: string;
  value: string;
  rest: string;
  backgroundColor: string;
}

const ExerciseCard = ({
  type,
  onEdit,
  onDelete,
  title,
  exerciseType,
  value,
  rest,
  backgroundColor,
}: ExerciseCardInterface) => {
  return (
    <View
      style={{
        height: height * 0.1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Canvas style={{ flex: 1, height: '100%', width: startWidth }}>
        {<Circle r={8} cy={height * 0.05} cx={startWidth} color='lightblue' />}
        {type != 'single' ? (
          <Path
            path={type == 'start' ? pathStart : type == 'end' ? pathEnd : pathMid}
            color='lightblue'
            style={'stroke'}
            strokeWidth={2}
          />
        ) : null}
      </Canvas>
      <View
        style={{
          width: '85%',
          height: height * 0.08,
          backgroundColor: backgroundColor + '66',
          paddingHorizontal: '5%',
          paddingVertical: '2.5%',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '25%',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={onEdit}>
              <MaterialIcons name='edit' size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <MaterialIcons name='delete' size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          <View
            style={{ display: 'flex', flexDirection: 'row', width: '50%', alignItems: 'center' }}
          >
            {exerciseType == 'reps' ? (
              <Text style={{ fontSize: 18, marginRight: 4 }}> 🔁 </Text>
            ) : (
              <Text style={{ fontSize: 18, marginRight: 4 }}> ⌛</Text>
            )}
            <Text style={{ color: '#fff', fontSize: 14 }}>
              {value} {exerciseType == 'reps' ? 'reps' : 'sec'}
            </Text>
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', width: '50%', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 18, marginRight: 4 }}>⏸️</Text>
            <Text style={{ color: '#fff', fontSize: 14 }}>
              {rest} {'sec'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({});
