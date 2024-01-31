import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';
import { title } from '../utils/types';

const { height, width } = Dimensions.get('window');

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

const TIME = [
  {
    title: '30 secs',
    value: 30,
  },
  {
    title: '60 secs',
    value: 60,
  },
  {
    title: '90 secs',
    value: 90,
  },
  {
    title: 'Custom',
    value: 0,
  },
];

const REPS = [
  {
    title: '8 reps',
    value: 8,
  },
  {
    title: '12 reps',
    value: 12,
  },
  {
    title: '15 reps',
    value: 15,
  },
  {
    title: 'Custom',
    value: 0,
  },
];

const CreateCircuits = () => {
  const [circuitTitle, setCircuitTitle] = React.useState<title>({
    title: '',
    focus: false,
  });
  const [selectedType, setSelectedType] = React.useState<number>(0);
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  useEffect(() => {
    if (selectedType == 0) {
      setSelectedValue('30 secs');
    } else {
      setSelectedValue('8 reps');
    }
  }, [selectedType]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'black'}
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <View style={styles.basic}>
        <AppTitle text1='Create ' text2='Circuits' fontSize={height * 0.035} />
      </View>

      {/* Form */}

      <View style={[styles.basic, { flexDirection: 'column', marginTop: '5%' }]}>
        <Text
          style={{ color: circuitTitle.focus ? colors.secondary : colors.primary, fontSize: 16 }}
        >
          {'Circuit Title*'}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderBottomWidth: 1,
            borderBottomColor: circuitTitle.focus ? colors.secondary : colors.primary,
            marginVertical: 4,
          }}
        >
          <TextInput
            style={{ backgroundColor: '#000', fontSize: 20, padding: '2.5%', color: '#fff' }}
            value={circuitTitle.title}
            onChangeText={(val) => {
              let obj = { ...circuitTitle };
              obj.title = val;
              setCircuitTitle(obj);
            }}
            onFocus={() => {
              let obj = { ...circuitTitle };
              obj.focus = true;
              setCircuitTitle(obj);
            }}
            placeholder='Add Title'
            placeholderTextColor={'#c7c7c777'}
            // onBlur={() => {
            //   let obj = { ...circuitTitle };
            //   obj.focus = false;
            //   setCircuitTitle(obj);
            // }}
          />
        </View>
      </View>

      <View style={[styles.basic, { flexDirection: 'column', marginTop: '5%' }]}>
        <AppTitle text1='Add ' text2='Sets' fontSize={height * 0.025} />
        <View style={{ display: 'flex', flexDirection: 'column', marginTop: '2.5%' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderBottomWidth: 1,
              borderBottomColor: circuitTitle.focus ? colors.secondary : colors.primary,
              marginVertical: 4,
            }}
          >
            <TextInput
              style={{ backgroundColor: '#000', fontSize: 20, padding: '2.5%', color: '#fff' }}
              value={circuitTitle.title}
              onChangeText={(val) => {
                let obj = { ...circuitTitle };
                obj.title = val;
                setCircuitTitle(obj);
              }}
              onFocus={() => {
                let obj = { ...circuitTitle };
                obj.focus = true;
                setCircuitTitle(obj);
              }}
              placeholder='Select Exercises'
              placeholderTextColor={'#c7c7c777'}
              // onBlur={() => {
              //   let obj = { ...circuitTitle };
              //   obj.focus = false;
              //   setCircuitTitle(obj);
              // }}
            />
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: width * 0.4,
              borderWidth: 0.5,
              borderColor: colors.secondary,
              justifyContent: 'space-between',
              padding: '1%',
              borderRadius: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedType(0);
              }}
              style={{
                backgroundColor: selectedType == 0 ? colors.secondary : '#000',
                paddingVertical: '2.5%',
                paddingHorizontal: '10%',
                borderRadius: 16,
              }}
            >
              <Text style={{ color: '#fff' }}>Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedType(1);
              }}
              style={{
                backgroundColor: selectedType == 1 ? colors.secondary : '#000',
                paddingVertical: '2.5%',
                paddingHorizontal: '10%',
                borderRadius: 16,
              }}
            >
              <Text style={{ color: '#fff' }}>Reps</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '2.5%',
              justifyContent: 'space-between',
            }}
          >
            {selectedType == 0
              ? TIME.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedValue(item.title);
                      }}
                      style={{
                        backgroundColor: selectedValue == item.title ? colors.secondary : '#000',
                        paddingVertical: '2.5%',
                        paddingHorizontal: '2%',
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: selectedValue == item.title ? '#000' : colors.secondary,
                      }}
                    >
                      <Text style={{ color: '#fff' }}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })
              : REPS.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedValue(item.title);
                      }}
                      style={{
                        backgroundColor: selectedValue == item.title ? colors.secondary : '#000',
                        paddingVertical: '2.5%',
                        paddingHorizontal: '2%',
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: selectedValue == item.title ? '#000' : colors.secondary,
                      }}
                    >
                      <Text style={{ color: '#fff' }}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateCircuits;

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
