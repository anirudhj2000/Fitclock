import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import ContainedButton from './ContainedButton';
import { AppStackScreenProps } from '../utils/types';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface CircuitEndModalInterface {
  showModal: boolean;
  handleClose: () => void;
}

const { height, width } = Dimensions.get('window');

const CircuitEndModal = ({ showModal, handleClose }: CircuitEndModalInterface) => {
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
        runOnJS(handleClose)();
        offset.value = 0;
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(0, offset.value) }],
  }));
  return (
    <View style={{ display: 'flex' }}>
      <StatusBar
        animated={true}
        backgroundColor={'black'}
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={true}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}
        onRequestClose={handleClose}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.centeredView}>
            <Animated.View style={[styles.modalView, animatedStyles]}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <GestureDetector gesture={pan}>
                  <View
                    style={[
                      {
                        height: 8,
                        width: '20%',
                        backgroundColor: '#666666',
                        marginBottom: '1.5%',
                        zIndex: 5,
                        borderRadius: 8,
                      },
                    ]}
                  ></View>
                </GestureDetector>
              </View>
              <View style={styles.container}>
                <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} autoStart={true} fadeOut />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: '7.5%',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      borderWidth: 0.5,
                      borderColor: colors.secondary,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      height: height * 0.2,
                      width: width * 0.8,
                      paddingRight: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={require('../../assets/layeredpeaks.png')}
                      resizeMode='cover'
                      style={{ height: '100%', width: '100%', position: 'absolute' }}
                    />
                    <Image
                      style={{ height: height * 0.07, width: height * 0.07, marginBottom: '5%' }}
                      source={require('../../assets/guy.png')}
                    />
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 12,
                        fontFamily: 'Inter_400Regular',
                      }}
                    >
                      Circuit is completed!!
                    </Text>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 24,
                        fontFamily: 'Inter_400Regular',
                        fontWeight: 'bold',
                        marginBottom: '1.5%',
                        marginTop: -6,
                      }}
                    >
                      CONGRATULATIONS
                    </Text>
                  </View>
                </View>
                <View style={styles.statCard}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name='clock'
                      size={18}
                      color='#0d4040'
                      style={{
                        backgroundColor: '#7bb5b5',
                        padding: '2%',
                        borderRadius: 100,
                        marginRight: 4,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        color: '#fff',
                        // fontWeight: 'bold'
                      }}
                    >
                      {' '}
                      30 Mins
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        height: 32,
                        width: 32,
                        backgroundColor: '#7bb5b5',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        marginRight: 4,
                      }}
                    >
                      <FontAwesome5 name='burn' size={18} color='#0d4040' />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        color: '#fff',
                        // fontWeight: 'bold',
                      }}
                    >
                      {' '}
                      200 Cal
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: height * 0.15,
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: '15%',
                    padding: '2.5%',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 14,
                        color: colors.background,
                      }}
                    >
                      You have successfully completed your{' '}
                      <Text
                        style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 14,
                          color: colors.secondary,
                        }}
                      >
                        HIIT Workout{' '}
                      </Text>
                      and have burned
                      <Text
                        style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 14,
                          color: '#825205',
                        }}
                      >
                        {' '}
                        120 Calories{' '}
                      </Text>
                      in
                      <Text
                        style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 14,
                          color: '#188c1e',
                        }}
                      >
                        {' '}
                        30 Mins{' '}
                      </Text>
                      of your Circuit
                    </Text>
                  </View>
                  <View
                    style={{
                      width: width * 0.75,
                      bottom: 0,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.secondary,
                        paddingVertical: '2.5%',
                        paddingHorizontal: '7.5%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        handleClose();
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Inter_400Regular',
                          color: colors.primary,
                          fontSize: 16,
                        }}
                      >
                        {'Continue'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

export default CircuitEndModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.primary,
    width: '100%',
  },

  basic: {
    display: 'flex',
    marginHorizontal: '2.5%',
  },

  statCard: {
    height: height * 0.07,
    marginTop: '5%',
    width: width * 0.8,
    backgroundColor: '#0d3333',
    borderWidth: 0.5,
    borderColor: colors.secondary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000000aa',
  },
  modalView: {
    backgroundColor: colors.background,
    height: '60%',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    // borderTopLeftRadius: 32,
    // borderTopRightRadius: 32,
    borderRadius: 16,
    marginBottom: '40%',
    padding: '5%',
    borderWidth: 0.5,
    borderColor: colors.secondary,
  },
});
