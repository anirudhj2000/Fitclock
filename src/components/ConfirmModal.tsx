import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { AntDesign } from '@expo/vector-icons';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import OutlinedButton from './OutlinedButton';
import ContainedButton from './ContainedButton';

interface ConfirmModalInterface {
  visible: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ visible, onCancel, onConfirm, title }: ConfirmModalInterface) => {
  return (
    <View style={{ display: 'flex' }}>
      <Modal animationType='slide' transparent={true} visible={visible} onRequestClose={onCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={onCancel}>
                <AntDesign name='close' size={18} color={colors.secondary} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: '2.5%' }}>
              <Text
                style={{ color: colors.secondary, fontFamily: 'Inter_400Regular', fontSize: 20 }}
              >
                {title}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '2.5%',
                marginTop: '10%',
              }}
            >
              <OutlinedButton title='Cancel' onClick={onCancel} />
              <ContainedButton title='Confirm' onClick={onConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000cc',
  },
  modalView: {
    backgroundColor: '#022424',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    padding: '2.5%',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
});
