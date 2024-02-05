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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get('window');

interface ModalInterface {
  modalVisible: boolean;
  handleModalClose: () => void;
}

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePassword = (password: string): boolean => {
  // Password regex rules:
  // At least 8 characters
  // At least one uppercase letter
  // At least one lowercase letter
  // At least one number
  // At least one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const checkIfUserExists = (email: string) => {
  return new Promise<any>((resolve, reject) => {
    firestore()
      .collection('User')
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('user exists');
          resolve(documentSnapshot);
        } else resolve(false);
      })
      .catch((err) => reject());
  });
};

const SignupModal = ({ modalVisible, handleModalClose }: ModalInterface) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const addUserData = () => {
    checkIfUserExists(email).then((res) => {
      console.log('ithe aalo');
      if (!res) {
        firestore()
          .collection('User')
          .doc(email)
          .set({
            email: email,
            name: name,
            joinedOn: new Date(),
          })
          .then(() => {
            console.log('user data added');
            clearData();
            handleModalClose();
            Toast.show({
              position: 'top',
              type: 'success',
              text1: 'Signup successfull',
            });
          });
      }
    });
  };

  const clearData = () => {
    setName('');
    setPassword('');
    setEmail('');
    setPasswordConfirm('');
    setUsernameError(null);
    setPasswordError(null);
  };

  const onSubmit = () => {
    if (name.length == 0) {
      setUsernameError('Please Enter Name!');
      return;
    }

    if (!validateEmail(email)) {
      setUsernameError('Please Enter Valid Email!');
      return;
    }

    if (!validatePassword(password)) {
      setUsernameError(
        'Please Enter Password that contains atleast 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 special character!',
      );
      return;
    }

    console.log('pass', password, passwordConfirm);

    if (password != passwordConfirm) {
      setUsernameError('Please enter matching passwords!');
      return;
    }

    setUsernameError(null);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        auth().signOut();
        addUserData();
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            position: 'top',
            type: 'info',
            text1: 'That email address is already in use!',
          });
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Toast.show({
            position: 'top',
            type: 'error',
            text1: 'That email address is invalid!',
          });
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2.5%',
                }}
              >
                <AppTitle text1='Sign' text2='Up' fontSize={32} />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginVertical: '5%',
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text
                    style={{
                      marginHorizontal: 4,
                      marginBottom: '1%',
                      fontSize: 14,
                      color: '#000',
                    }}
                  >
                    Name
                  </Text>
                  <TextInput
                    placeholder='Name'
                    onChangeText={(text) => setName(text)}
                    placeholderTextColor={'#c7c7c7'}
                    style={[
                      styles.textContainer,
                      //   {marginBottom: passwordError ? 0 : '5%'},
                    ]}
                  />
                  {/* {usernameError && (
                      <Text
                        style={{
                          color: '#E50000',
                          fontSize: 12,
                          marginVertical: 4,
                        }}>
                        {usernameError}
                      </Text>
                    )} */}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text
                    style={{
                      marginHorizontal: 4,
                      marginBottom: '1%',
                      fontSize: 14,
                      color: '#000',
                    }}
                  >
                    Email
                  </Text>
                  <TextInput
                    placeholder='Email'
                    placeholderTextColor={'#c7c7c7'}
                    onChangeText={(text) => setEmail(text)}
                    style={[
                      styles.textContainer,
                      //   {marginBottom: passwordError ? 0 : '5%'},
                    ]}
                  />
                  {/* {usernameError && <Text>{usernameError}</Text>} */}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text
                    style={{
                      marginHorizontal: 4,
                      marginBottom: '1%',
                      fontSize: 14,
                      color: '#000',
                    }}
                  >
                    Password
                  </Text>
                  <TextInput
                    placeholder='Password'
                    secureTextEntry
                    placeholderTextColor={'#c7c7c7'}
                    onChangeText={(text) => setPassword(text)}
                    style={[
                      styles.textContainer,
                      //   {marginBottom: passwordError ? 0 : '5%'},
                    ]}
                  />
                  {/* {passwordError && <Text>{passwordError}</Text>} */}
                </View>
                <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-100}>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text
                      style={{
                        marginHorizontal: 4,
                        fontSize: 14,
                        color: '#000',
                      }}
                    >
                      Confirm Password
                    </Text>
                    <TextInput
                      placeholder='Confirm Password'
                      secureTextEntry
                      value={passwordConfirm}
                      placeholderTextColor={'#c7c7c7'}
                      onChangeText={(text) => setPasswordConfirm(text)}
                      style={[styles.textContainer, { marginBottom: usernameError ? 0 : '5%' }]}
                    />
                    {usernameError && (
                      <Text
                        style={{
                          color: '#E50000',
                          fontSize: 12,
                          marginTop: 8,
                        }}
                      >
                        {usernameError}
                      </Text>
                    )}
                  </View>
                </KeyboardAvoidingView>
              </View>
              <TouchableOpacity
                onPress={() => {
                  onSubmit();
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2.5%',
                  backgroundColor: colors.secondary,
                }}
              >
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Signup</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

export default SignupModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.background,
    height: '65%',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: '5%',
    borderWidth: 0.5,
    borderColor: colors.secondary,
  },
  button: {
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
    paddingHorizontal: 8,
    height: height * 0.05,
    color: '#fff',
  },
});
