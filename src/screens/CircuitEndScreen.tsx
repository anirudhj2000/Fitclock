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
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import ContainedButton from '../components/ContainedButton';
import { AppStackScreenProps } from '../utils/types';

const { height, width } = Dimensions.get('window');

const CircuitEndScreen = ({ navigation }: AppStackScreenProps) => (
  <SafeAreaView style={styles.container}>
    <StatusBar
      animated={true}
      backgroundColor={'black'}
      barStyle={'light-content'}
      showHideTransition={'slide'}
      hidden={false}
    />
    <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} autoStart={true} />
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%',
      }}
    >
      <View
        style={{
          display: 'flex',
          borderWidth: 0.5,
          borderColor: colors.secondary,
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: height * 0.3,
          width: width * 0.95,
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
          style={{ height: height * 0.1, width: height * 0.1, marginBottom: '5%' }}
          source={require('../../assets/guy.png')}
        />
        <Text
          style={{
            color: colors.primary,
            fontSize: 16,
            fontFamily: 'Inter_400Regular',
          }}
        >
          Circuit is completed!!
        </Text>
        <Text
          style={{
            color: colors.primary,
            fontSize: 32,
            fontFamily: 'Inter_400Regular',
            fontWeight: 'bold',
            marginBottom: '5%',
            marginTop: -6,
          }}
        >
          CONGRATULATIONS
        </Text>
      </View>
    </View>
    <View
      style={[
        styles.basic,
        {
          display: 'flex',
          flexDirection: 'row',
          marginTop: '7.5%',
          justifyContent: 'space-between',
        },
      ]}
    >
      <View style={styles.statCard}>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: '#fff' }}>mins</Text>
        <Text
          style={{ fontFamily: 'Inter_400Regular', fontSize: 32, color: '#fff', marginTop: -6 }}
        >
          🔥15:30
        </Text>
      </View>
      <View style={styles.statCard}>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: '#fff' }}>Burn</Text>
        <Text
          style={{ fontFamily: 'Inter_400Regular', fontSize: 32, color: '#fff', marginTop: -6 }}
        >
          ⏳84
        </Text>
      </View>
    </View>
    <View
      style={{ position: 'absolute', width: width * 0.95, bottom: 20, marginHorizontal: '2.5%' }}
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
          navigation.navigate('Home');
        }}
      >
        <Text style={{ fontFamily: 'Inter_400Regular', color: colors.primary, fontSize: 18 }}>
          {'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default CircuitEndScreen;

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
    height: height * 0.1,
    width: width * 0.4,
    backgroundColor: '#0d3333',
    borderWidth: 1,
    borderColor: colors.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
