import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../utils/colors';
import { Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, AppStackParamList, AppStackScreenProps } from '../utils/types';

interface CircuitsLoaderInterface {
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
}

const CircuitsLoader = ({ visible, onClose, onCancel }: CircuitsLoaderInterface) => {
  const [value, setValue] = useState<number>(3);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const navigation = useNavigation<AppNavigationProp>();

  useEffect(() => {
    if (visible) {
      intervalId.current = setInterval(() => {
        setValue((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        if (intervalId.current !== null) {
          clearInterval(intervalId.current);
        }
      };
    }
  }, [visible]);

  useEffect(() => {
    if (value == 0) {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
        navigation.navigate('CircuitPlayer');
        onClose();
        setValue(3);
      }
    }
  }, [value]);

  return (
    <View>
      <Modal visible={visible} onDismiss={onClose} transparent>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#167070' + 'cc',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              marginHorizontal: '1.5%',
              marginVertical: '5%',
            }}
            onPress={() => {
              onCancel();
              setValue(3);
              if (intervalId.current !== null) {
                clearInterval(intervalId.current);
              }
            }}
          >
            <Ionicons name='close-sharp' size={32} color={colors.primary} />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 32, fontFamily: 'Inter_700Bold' }}>
              Circuit starts in ...
            </Text>
            <Text style={{ color: '#fff', fontSize: 128, fontFamily: 'Inter_700Bold' }}>
              {value}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CircuitsLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
