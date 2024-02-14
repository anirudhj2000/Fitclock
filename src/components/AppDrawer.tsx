import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import useUserStore from '../utils/store';
import { colors } from '../utils/colors';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get('window');

let screens = [
  {
    screen: 'Home',
    icon: 'home-export-outline',
    name: 'Home',
  },
  {
    screen: 'Circuits',
    icon: 'basket-outline',
    name: 'Circuits',
  },
  {
    screen: 'CreateCircuits',
    icon: 'barcode-scan',
    name: 'Add Circuits',
  },
];

const AppDrawerComponent = ({ navigation }: DrawerContentComponentProps) => {
  const [user, setUser] = React.useState<any>({});
  const updateUser = useUserStore((state) => state.updateUser);
  // const user = useUserStore((state) => state.user);
  useEffect(() => {
    fetchInfo();
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        AsyncStorage.clear();
        updateUser(null);
        console.log('logged out');
        Toast.show({
          position: 'top',
          type: 'success',
          text1: 'Logged out successfully!!',
        });
      });
  };

  const fetchInfo = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#035e5e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 1,
        position: 'absolute',
        top: 0,
      }}
    >
      <View>
        <View
          style={{
            width: '95%',
            marginHorizontal: '2.5%',
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#c7c7c766',
            padding: '5%',
            borderRadius: 8,
          }}
        >
          {user.image ? (
            <Image
              style={{
                height: height * 0.075,
                width: height * 0.075,
                borderRadius: height * 0.1,
              }}
              source={{ uri: user.image }}
            />
          ) : (
            <View
              style={{
                height: height * 0.075,
                width: height * 0.075,
                borderRadius: height * 0.1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#556565',
              }}
            >
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 24, color: '#fff' }}>
                {user?.name?.length > 0 ? user.name[0] : '0'}
              </Text>
            </View>
          )}
          <Text
            style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: '#fff', marginTop: '5%' }}
          >
            {user?.name}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: '#fff',
              marginTop: '2.5%',
            }}
          >
            {user?.email}
          </Text>
        </View>
        <View
          style={{
            marginTop: '5%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {screens.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('App', { screen: item.screen });
                  navigation.closeDrawer();
                }}
                key={index}
                style={{
                  width: '95%',
                  marginHorizontal: '2.5%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.7,
                  borderColor: '#c7c7c7',
                  marginBottom: '5%',
                  padding: '5%',
                  borderRadius: 8,
                  backgroundColor: '#fff',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginHorizontal: '5%',
                    color: '#000',
                    fontWeight: 'bold',
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
        style={{
          height: height * 0.06,
          marginHorizontal: '2.5%',
          backgroundColor: '#000',
          marginVertical: '5%',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            color: '#fff',
            fontSize: 16,
            marginHorizontal: '2.5%',
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppDrawerComponent;

const styles = StyleSheet.create({});
