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
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';
import { ProgressChart } from 'react-native-chart-kit';
import CircuitCard from '../components/CircuitCard';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AppStackScreenProps } from '../utils/types';
import { useIsFocused } from '@react-navigation/native';
import useUserStore from '../utils/store';
import firestore from '@react-native-firebase/firestore';
import { setObjectInterface } from '../utils/types';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import BottomNavigator from '../components/BottomNavigator';

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
  const focused = useIsFocused();
  const user = useUserStore((state) => state.user);
  let updateUser = useUserStore((state) => state.updateUser);
  const [circuitsList, setCircuitsList] = useState<Array<any>>([]);
  const [selected, setSelected] = React.useState<number>(0);

  useEffect(() => {
    getCricuitList();
    setSelected(0);
  }, [focused]);

  const getCricuitList = () => {
    if (user.email) {
      console.log('user1', user.email);
      firestore()
        .collection('Circuits')
        .where('user', '==', user.email)
        .limit(5)
        .get()
        .then((query) => {
          let arr: any = [];

          console.log('result', query.docs);
          query.docs.map((item) => {
            arr.push(item.data());
          });
          console.log('arr', arr);
          setCircuitsList(arr);
        })
        .catch((err: any) => {
          console.log('err', err);
        });
    }
  };

  const handleBottomNavigationSelect = (index: number) => {
    index == 0
      ? navigation.navigate('Home')
      : index == 1
        ? navigation.navigate('CreateCircuits')
        : navigation.navigate('Circuits');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppTitle fontSize={28} text1='FIT' text2='CLOCK' />
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            auth().signOut();
            updateUser(null);
          }}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <Image
            style={{ height: height * 0.035, width: height * 0.035 }}
            source={require('../../assets/guy.png')}
          />
        </TouchableOpacity>
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
            <Text style={{ fontFamily: 'Inter_400Regular', color: colors.primary, fontSize: 18 }}>
              Streak
            </Text>
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
                    <Text style={{ fontFamily: 'Inter_400Regular', color: colors.primary }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'Inter_400Regular', color: colors.primary, fontSize: 18 }}>
              Sessions
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular', color: colors.secondary, fontSize: 28 }}>
              89
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.progressView,
          { height: height * 0.125, justifyContent: 'space-between', paddingHorizontal: '1.5%' },
        ]}
        onPress={() => {
          navigation.navigate('CreateCircuits');
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name='flash-outline' size={height * 0.08} color={colors.primary} />
          <Text style={{ fontFamily: 'Inter_400Regular', color: colors.primary }}>Start!</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: width * 0.7,
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 18,
              color: colors.primary,
              marginBottom: '2.5%',
              textDecorationLine: 'underline',
            }}
          >
            {'Create HIIT Circuits !! '}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
              color: colors.primary,
            }}
          >
            Craft, sweat, conquer with personalized HIIT circuits. Get fit now!
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginHorizontal: '2.5%', marginTop: '2.5%' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <AppTitle fontSize={24} text1='Cir' text2='cuits' />
          <TouchableOpacity
            style={{ marginRight: '2.5%' }}
            onPress={() => {
              navigation.navigate('Circuits');
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter_400Regular',
                color: colors.primary,
                textDecorationLine: 'underline',
              }}
            >
              View all..
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '5%',
          }}
        >
          <FlatList
            style={{ height: height * 0.4, overflow: 'hidden' }}
            data={circuitsList}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: height * 0.2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10%',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('CreateCircuits');
                    }}
                  >
                    <MaterialIcons
                      name='add-circle'
                      size={height * 0.05}
                      color={colors.primary + 'aa'}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      color: colors.primary + 'aa',
                      fontSize: 18,
                      textAlign: 'center',
                      marginTop: '1.5%',
                    }}
                  >
                    Add new circuits!!
                  </Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return <CircuitCard title={item.title} duration={item.duration} onClick={() => {}} />;
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <BottomNavigator
          selected={selected}
          onClick={(index) => {
            setSelected(index);
            handleBottomNavigationSelect(index);
          }}
        />
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
