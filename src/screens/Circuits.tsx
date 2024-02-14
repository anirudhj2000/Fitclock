import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AppTitle from '../components/AppTitle';
import { AppStackScreenProps } from '../utils/types';
import useUserStore from '../utils/store';
import firestore from '@react-native-firebase/firestore';
import CircuitCard from '../components/CircuitCard';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get('window');

const Circuits = ({ navigation }: AppStackScreenProps) => {
  const user = useUserStore((state) => state.user);
  const [circuitsList, setCircuitsList] = useState<Array<any>>([]);

  useEffect(() => {
    getCricuitList();
  }, []);

  const getCricuitList = () => {
    console.log('user', user.email);
    if (user.email)
      firestore()
        .collection('Circuits')
        .where('user', '==', user?.email)
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
        .catch(() => {
          Toast.show({
            position: 'top',
            type: 'error',
            text1: 'Some error has occurred!!',
          });
        });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 10 }}>
        <Toast />
      </View>
      <StatusBar
        animated={true}
        backgroundColor={'black'}
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <View
        style={[
          styles.basic,
          {
            marginTop: Platform.OS == 'android' ? '5%' : 0,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 0,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            // AsyncStorage.clear();
            // auth().signOut();
            // updateUser(null);
            navigation.goBack();
          }}
        >
          <Ionicons
            name='chevron-back'
            size={height * 0.04}
            color='white'
            style={{ marginRight: 4 }}
          />
        </TouchableOpacity>
        <AppTitle text1='Cir' text2='cuits' fontSize={height * 0.035} />
      </View>
      <View style={[styles.basic, { display: 'flex', flexDirection: 'column', marginTop: '5%' }]}>
        <FlatList
          style={{ height: height * 0.8, overflow: 'hidden' }}
          data={circuitsList}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: height * 0.6,
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
            return (
              <CircuitCard
                title={item.title}
                duration={item.duration}
                onClick={() => {
                  navigation.navigate('CircuitPlayer');
                }}
                onEdit={() => {
                  navigation.navigate('CreateCircuits', { id: item.id });
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Circuits;

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
