import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';

const { height, width } = Dimensions.get('window');

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppTitle fontSize={28} />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image
            style={{ height: height * 0.035, width: height * 0.035 }}
            source={require('../../assets/guy.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
    color: colors.primary,
    width: '100%',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.primary,
    marginHorizontal: '2.5%',
  },
});
