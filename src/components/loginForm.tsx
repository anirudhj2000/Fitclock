import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import auth from '@react-native-firebase/auth';
import { checkIfUserExists } from './SignupModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import useUserStore from '../utils/store';

const { height, width } = Dimensions.get('window');

interface LoginFormInterface {
  onPressSignup: () => void;
}

const LoginForm = ({ onPressSignup }: LoginFormInterface) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const updateUser = useUserStore((state) => state.updateUser);

  const onSubmit = () => {
    let isValid = true;

    if (!username) {
      setUsernameError('Email is required.');
      isValid = false;
    } else {
      setUsernameError(null);
    }

    if (!password || password.length < 8) {
      setPasswordError('Password is required and must be at least 8 characters.');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (isValid) {
      auth()
        .signInWithEmailAndPassword(username, password)
        .then((res) => {
          checkIfUserExists(username).then((exists) => {
            if (exists) {
              AsyncStorage.setItem('user', JSON.stringify(exists.data()));
              updateUser(exists.data());
              Toast.show({
                position: 'top',
                type: 'success',
                text1: 'Logged in Successfully!',
              });
            }
          });
        })
        .catch((err) => {
          console.log('err', err);
          Toast.show({
            position: 'top',
            type: 'error',
            text1: 'Some error has occurred!',
          });
        });
    }
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column', zIndex: 2 }}>
      <TextInput
        placeholder='Email'
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor={'#c7c7c7'}
        style={[
          styles.textContainer,
          {
            fontFamily: 'Inter_400Regular',
            marginBottom: passwordError ? 0 : '5%',
            height: height * 0.05,
          },
        ]}
      />
      {usernameError && (
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            color: '#E50000',
            fontSize: 12,
            marginVertical: 4,
          }}
        >
          {usernameError}
        </Text>
      )}
      <TextInput
        placeholder='Password'
        secureTextEntry
        placeholderTextColor={'#c7c7c7'}
        onChangeText={(text) => setPassword(text)}
        style={[
          styles.textContainer,
          {
            fontFamily: 'Inter_400Regular',
            marginBottom: passwordError ? 0 : '5%',
            height: height * 0.05,
          },
        ]}
      />
      {passwordError && (
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            color: '#E50000',
            fontSize: 12,
            marginVertical: 4,
          }}
        >
          {passwordError}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          onSubmit();
          //   navigation.navigate('App', {screen: 'Home'});
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5%',
          backgroundColor: colors.secondary,
          marginVertical: '1.5%',
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressSignup}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5%',
          backgroundColor: '#fff',
          marginVertical: '1.5%',
          borderWidth: 2,
          borderColor: '#000',
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: '5%',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    paddingHorizontal: 8,
    color: '#fff',
  },
});
