import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { AppStackScreenProps } from '../utils/types';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import AppTitle from '../components/AppTitle';
import { colors } from '../utils/colors';
import { Inter_700Bold } from '@expo-google-fonts/inter';
import ConfettiCannon from 'react-native-confetti-cannon';
import CircuitEndModal from '../components/CircuitEndModal';
import CircuitsLoader from '../components/CircuitsLoader';

const { height, width } = Dimensions.get('window');

const CircuitPlayer = ({ navigation }: AppStackScreenProps) => {
  const [showCircuitEndModal, setShowCircuitEndModal] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setShowLoading(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'black'}
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={true}
      />
      <View
        style={[
          styles.basic,
          {
            marginTop: Platform.OS == 'android' ? '5%' : 0,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 0,
            justifyContent: 'flex-end',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name='close' size={height * 0.04} color='white' style={{ marginRight: 4 }} />
        </TouchableOpacity>
      </View>
      <View style={[styles.basic, { display: 'flex', flexDirection: 'column', marginTop: '10%' }]}>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.secondary }}>
          {' HIIT Circuit (No Equipment) '}
        </Text>
        <Text
          style={{
            fontSize: 44,
            color: colors.primary,
            fontFamily: 'Inter_400Regular',
            marginTop: -4,
          }}
        >
          SQUAT
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10%',
        }}
      >
        <Text
          style={{
            fontSize: 128,
            color: colors.primary,
            fontFamily: 'Inter_400Regular',
          }}
        >
          1:30
        </Text>
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 24,
            color: '#fff',
            marginTop: -16,
            fontWeight: 'bold',
          }}
        >
          mins
        </Text>
      </View>
      <View style={{ display: 'flex', maxHeight: height * 0.1, marginTop: '10%' }}>
        <Image
          source={require('../../assets/wave.png')}
          resizeMode='cover'
          style={{ width: width, height: height * 0.1 }}
        />
      </View>
      <View
        style={[
          styles.basic,
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '20%',
          },
        ]}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name='close'
              size={height * 0.04}
              color={colors.secondary}
              style={{ marginRight: 4 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: colors.primary, padding: '7.5%', borderRadius: 24 }}
        >
          <Fontisto name='pause' size={height * 0.025} color='black' />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              setShowCircuitEndModal(true);
            }}
          >
            <MaterialCommunityIcons
              name='skip-next'
              size={height * 0.04}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.basic,
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '15%',
          },
        ]}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.3,
          }}
        >
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 42, color: '#fff' }}>15:30</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: '#fff' }}>mins</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.3,
          }}
        >
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 42, color: '#fff' }}>4/8</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: '#fff' }}>
            Exercises
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.3,
          }}
        >
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 42, color: '#fff' }}>84</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: '#fff' }}>Burn</Text>
        </View>
      </View>

      <CircuitEndModal
        showModal={showCircuitEndModal}
        handleClose={() => {
          setShowCircuitEndModal(false);
          navigation.navigate('Home');
        }}
      />

      <CircuitsLoader
        visible={showLoading}
        onClose={() => {
          setShowLoading(false);
        }}
      />
    </SafeAreaView>
  );
};

export default CircuitPlayer;

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
});
