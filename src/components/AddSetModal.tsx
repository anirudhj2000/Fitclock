import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '../utils/colors';
import AppTitle from './AppTitle';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

interface ModalInterface {
  modalVisible: boolean;
  handleModalClose: () => void;
}

const TIME = [
  {
    title: '30 secs',
    value: 30,
  },
  {
    title: '60 secs',
    value: 60,
  },
  {
    title: '90 secs',
    value: 90,
  },
  {
    title: 'Custom',
    value: 0,
  },
];

const REPS = [
  {
    title: '8 reps',
    value: 8,
  },
  {
    title: '12 reps',
    value: 12,
  },
  {
    title: '15 reps',
    value: 15,
  },
  {
    title: 'Custom',
    value: 0,
  },
];

const REST = [
  {
    title: '15 secs',
    value: 15,
  },
  {
    title: '30 secs',
    value: 30,
  },
  {
    title: '45 secs',
    value: 45,
  },
  {
    title: 'Custom',
    value: 0,
  },
];

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const AddSetsModal = ({ modalVisible, handleModalClose }: ModalInterface) => {
  const [selectedType, setSelectedType] = React.useState<number>(0);
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  const [restValue, setRestValue] = React.useState<string>('15 secs');
  const [value, setValue] = useState<any>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    if (selectedType == 0) {
      setSelectedValue('30 secs');
    } else {
      setSelectedValue('8 reps');
    }
  }, [selectedType]);

  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin((event) => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationY;
    })
    .onFinalize((event) => {
      pressed.value = false;
      if (event.translationY > 200) {
        runOnJS(handleModalClose)();
        offset.value = 0;
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(0, offset.value) }],
  }));

  return (
    <View style={{ display: 'flex' }}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.centeredView}>
            <Animated.View style={[styles.modalView, animatedStyles]}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopColor: '#c7c7c7',
                }}
              >
                <GestureDetector gesture={pan}>
                  <View
                    style={[
                      {
                        height: 8,
                        width: '20%',
                        backgroundColor: '#666666',
                        borderRadius: 16,
                        marginBottom: '1.5%',
                        zIndex: 5,
                      },
                    ]}
                  ></View>
                </GestureDetector>
              </View>
              <View style={[styles.basic, { flexDirection: 'column', marginTop: '5%' }]}>
                <AppTitle text1='Add ' text2='Sets' fontSize={height * 0.025} />
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderBottomWidth: 1,
                      marginVertical: 4,
                    }}
                  >
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: colors.secondary }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={data}
                      search
                      maxHeight={300}
                      labelField='label'
                      valueField='value'
                      placeholder={'Select Exercise'}
                      searchPlaceholder='Search...'
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', marginTop: '7.5%' }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: colors.primary, fontSize: 16 }}>
                      {selectedType == 0 ? 'Duration' : 'Reps'}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: width * 0.3,
                        borderWidth: 0.5,
                        borderColor: colors.secondary,
                        justifyContent: 'space-between',
                        padding: '1%',
                        borderRadius: 16,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedType(0);
                        }}
                        style={{
                          backgroundColor: selectedType == 0 ? colors.secondary : '#000',
                          paddingVertical: '1.5%',
                          paddingHorizontal: '5%',
                          borderRadius: 16,
                        }}
                      >
                        <Text style={{ color: '#fff' }}>Duration</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedType(1);
                        }}
                        style={{
                          backgroundColor: selectedType == 1 ? colors.secondary : '#000',
                          paddingVertical: '1.5%',
                          paddingHorizontal: '5%',
                          borderRadius: 16,
                        }}
                      >
                        <Text style={{ color: '#fff' }}>Reps</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '2.5%',
                      justifyContent: 'space-between',
                    }}
                  >
                    {selectedType == 0
                      ? TIME.map((item, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedValue(item.title);
                              }}
                              style={{
                                backgroundColor:
                                  selectedValue == item.title ? colors.secondary : '#000',
                                paddingVertical: '2.5%',
                                paddingHorizontal: '2%',
                                borderWidth: 1,
                                borderColor:
                                  selectedValue == item.title ? '#000' : colors.secondary,
                              }}
                            >
                              <Text style={{ color: '#fff' }}>{item.title}</Text>
                            </TouchableOpacity>
                          );
                        })
                      : REPS.map((item, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedValue(item.title);
                              }}
                              style={{
                                backgroundColor:
                                  selectedValue == item.title ? colors.secondary : '#000',
                                paddingVertical: '2.5%',
                                paddingHorizontal: '2%',
                                borderWidth: 1,
                                borderColor:
                                  selectedValue == item.title ? '#000' : colors.secondary,
                              }}
                            >
                              <Text style={{ color: '#fff' }}>{item.title}</Text>
                            </TouchableOpacity>
                          );
                        })}
                  </View>
                  <View style={{ display: 'flex', marginTop: '7.5%' }}>
                    <Text style={{ color: colors.primary, fontSize: 16 }}>{'Rest'}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '2.5%',
                      justifyContent: 'space-between',
                    }}
                  >
                    {REST.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setRestValue(item.title);
                          }}
                          style={{
                            backgroundColor: restValue == item.title ? colors.secondary : '#000',
                            paddingVertical: '2.5%',
                            paddingHorizontal: '2%',
                            borderWidth: 1,
                            borderColor: restValue == item.title ? '#000' : colors.secondary,
                          }}
                        >
                          <Text style={{ color: '#fff' }}>{item.title}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: '15%',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: colors.secondary,
                      paddingVertical: '2.5%',
                      paddingHorizontal: '7.5%',
                      marginHorizontal: '2.5%',
                    }}
                  >
                    <Text style={{ color: colors.secondary }}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.secondary,
                      paddingVertical: '2.5%',
                      paddingHorizontal: '7.5%',
                    }}
                  >
                    <Text style={{ color: colors.primary }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

export default AddSetsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalView: {
    backgroundColor: '#000',
    height: '70%',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: colors.primary,
    elevation: 8,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: '5%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: '5%',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  basic: {
    display: 'flex',
  },

  dropdown: {
    height: height * 0.05,
    borderColor: colors.primary,
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: colors.secondary,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#fff',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
