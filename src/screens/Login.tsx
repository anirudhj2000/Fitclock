import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback } from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';
import { Octicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '7.5%',
        }}
      >
        <AppTitle fontSize={32} text1='FIT' text2='CLOCK' />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginHorizontal: '5%',
          marginTop: '7.5%',
        }}
      >
        <View
          style={[
            styles.section1,
            { justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: '2.5%' },
          ]}
        >
          {['2.35', '133.4', '12:15'].map((item) => {
            return <Text style={{ color: '#fff', fontSize: 32 }}>{item}</Text>;
          })}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 4,
          }}
        >
          {['Distance', 'Calories', 'Time'].map((item) => {
            return <Text style={{ color: '#fff', fontSize: 10 }}>{item}</Text>;
          })}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: height * 0.25,
          marginTop: '7.5%',
          marginHorizontal: '5%',
          justifyContent: 'space-between',
        }}
      >
        <View style={[styles.section2, { height: '100%', width: width * 0.2 }]}>
          <Octicons name='triangle-up' size={height * 0.05} color='white' />
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: height * 0.05 }}>{2}</Text>
            <Text style={{ color: '#fff', fontSize: 12 }}>{'elevation'}</Text>
          </View>
          <Octicons name='triangle-down' size={height * 0.05} color='white' />
        </View>
        <View style={[styles.section2, { height: '100%', width: width * 0.4 }]}></View>
        <View style={[styles.section2, { height: '100%', width: width * 0.2 }]}>
          <Octicons name='triangle-up' size={height * 0.05} color='white' />
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: height * 0.05 }}>{12}</Text>
            <Text style={{ color: '#fff', fontSize: 12 }}>{'speed'}</Text>
          </View>
          <Octicons name='triangle-down' size={height * 0.05} color='white' />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '7.5%',
          marginHorizontal: '5%',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.buttonOutline, { borderColor: 'red', borderBottomLeftRadius: 32 }]}>
            <Text style={{ fontSize: 18, color: 'red' }}>CLEAR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.buttonOutline, { borderColor: 'green' }]}>
            <Text style={{ fontSize: 18, color: 'green' }}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={[styles.buttonOutline, { borderColor: 'blue', borderBottomRightRadius: 32 }]}
          >
            <Text style={{ fontSize: 18, color: 'blue' }}>SIGNUP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'column',
    padding: '2.5%',
  },

  container1: {
    width: '100%',
    height: 75,
    borderRadius: 12,
    backgroundColor: 'blue',
  },

  section1: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#252526',
    height: height * 0.1,
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  section2: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#252526',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: height * 0.015,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  curvedLine: {
    width: '20%',
    height: 100,
    position: 'absolute',
    bottom: -25,
    left: '40%',
    borderRadius: 35,
    backgroundColor: 'black',
    transform: [{ scaleX: 5 }, { scaleY: 1 }],
  },
  buttonOutline: {
    width: width * 0.25,
    height: height * 0.07,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
