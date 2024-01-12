import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
