import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';

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
          marginVertical: '5%',
        }}
      >
        <AppTitle fontSize={32} text1='FIT' text2='CLOCK' />
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', marginHorizontal: '5%' }}>
        <View style={styles.section1}></View>
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
          height: height * 0.3,
          marginTop: '5%',
          marginHorizontal: '5%',
        }}
      >
        <View style={[styles.section2, { height: '100%', width: width * 0.2 }]}></View>
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

  section1: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#252526',
    height: height * 0.1,
    borderRadius: height * 0.015,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  section2: {
    display: 'flex',
    backgroundColor: '#252526',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: height * 0.015,
  },
});
