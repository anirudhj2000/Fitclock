import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';
import { ProgressChart } from 'react-native-chart-kit';
import CircuitCard from '../components/CircuitCard';
import { Ionicons } from '@expo/vector-icons';
import { AppStackScreenProps } from '../utils/types';

const { height, width } = Dimensions.get('window');

const data = {
  labels: ['Swim', 'Bike'], // optional
  data: [0.8, 0.6],
};

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(102, 178, 178, ${opacity})`,
  strokeWidth: 4, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Home = ({ navigation }: AppStackScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppTitle fontSize={28} text1='FIT' text2='CLOCK' />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image
            style={{ height: height * 0.035, width: height * 0.035 }}
            source={require('../../assets/guy.png')}
          />
        </View>
      </View>
      <View style={[styles.progressView, styles.shadowProp]}>
        <ProgressChart
          data={data}
          width={width * 0.45}
          height={height * 0.175}
          strokeWidth={height * 0.0175}
          radius={height * 0.04}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <View
          style={{
            width: width * 0.4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: height * 0.15,
            marginLeft: '5%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 18 }}>Streak</Text>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 4 }}>
              {['S', 'M', 'T', 'W', 'Th'].map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: height * 0.03,
                      width: height * 0.03,
                      borderRadius: height * 0.05,
                      backgroundColor: index % 5 ? '#ed433799' : '#4bb54399',
                      marginRight: 4,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: colors.primary }}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ color: colors.primary, fontSize: 18 }}>Sessions</Text>
            <Text style={{ color: colors.secondary, fontSize: 28 }}>89</Text>
          </View>
        </View>
      </View>
      <View style={[styles.progressView, { height: height * 0.14 }]}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: width * 0.7,
          }}
        >
          <Text style={{ fontSize: 18, color: colors.primary, marginBottom: '2.5%' }}>
            Create HIIT Circuits
          </Text>
          <Text style={{ fontSize: 14, color: colors.primary }}>
            Craft, sweat, conquer with personalized HIIT circuits. Get fit now!
          </Text>
        </View>

        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('CreateCircuits');
          }}
        >
          <Ionicons name='flash-outline' size={height * 0.08} color={colors.primary} />
          <Text style={{ color: colors.primary }}>Start!</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: '2.5%', marginTop: '2.5%' }}>
        <AppTitle fontSize={24} text1='CIRC' text2='UITS' />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '5%',
          }}
        >
          <FlatList
            data={[1, 2, 3, 4]}
            renderItem={({ item: any, index: number }) => {
              return <CircuitCard />;
            }}
            keyExtractor={(item, index) => index.toString()}
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
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
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
    marginTop: '5%',
  },

  progressView: {
    marginVertical: '5%',
    marginHorizontal: '2.5%',
    backgroundColor: '#000000',
    height: height * 0.2,
    borderWidth: 0.5,
    borderColor: colors.secondary,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  shadowProp: {
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
});
