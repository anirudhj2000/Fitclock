import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import React from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const ProfileAction = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      onPress={() => {
        // AsyncStorage.clear();
        // auth().signOut();
        // updateUser(null);
        navigation.openDrawer();
        console.log('clicked');
      }}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <Image
        style={{ height: height * 0.035, width: height * 0.035 }}
        source={require('../../assets/guy.png')}
      />
    </TouchableOpacity>
  );
};

export default ProfileAction;

const styles = StyleSheet.create({});
