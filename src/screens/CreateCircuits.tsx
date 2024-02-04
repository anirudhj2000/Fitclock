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
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';
import { title } from '../utils/types';
import { Dropdown } from 'react-native-element-dropdown';
import AddSetsModal from '../components/AddSetModal';
import OutlinedButton from '../components/OutlinedButton';
import ContainedButton from '../components/ContainedButton';
import { Ionicons } from '@expo/vector-icons';
import ExerciseCard from '../components/ExerciseCard';
import { setObjectInterface } from '../utils/types';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const r = 128;

interface setObjectInterface2 extends setObjectInterface {
  backgroundColor: string;
}

const CreateCircuits = () => {
  const [circuitTitle, setCircuitTitle] = React.useState<title>({
    title: '',
    focus: false,
  });
  const [exercisesList, setExercisesList] = React.useState<Array<setObjectInterface2>>([]);
  const [showAddSets, setShowAddSet] = React.useState<boolean>(false);
  const [circuitStats, setCircuitStats] = React.useState({
    time: 0,
    burn: 0,
    intensity: '',
  });

  const getType = (index: number, length: number) => {
    if (length == 1) {
      return 'single';
    } else {
      if (index == 0) return 'start';
      else if (index > 0 && index < length - 1) return 'mid';
      else return 'end';
    }
  };

  function getRandomColor() {
    // Generate a random hex color code
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  const handleCircuitStats = () => {
    let obj = {
      time: 0,
      burn: 0,
      intensity: '',
    };

    let time = 0;
    exercisesList.map((item, index) => {
      if (item.type == 'duration') {
        time += item.value;
      } else {
        time += item.value * 5;
      }
      time += item.rest;
    });

    obj.time = Math.ceil(time / 60);
    obj.burn = time * 0.2;
    obj.intensity = time > 600 ? 'high' : time < 300 ? 'low' : 'medium';

    setCircuitStats(obj);
  };

  useEffect(() => {
    handleCircuitStats();
  }, [exercisesList]);

  return (
    <SafeAreaView style={styles.container}>
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
        <Ionicons
          name='chevron-back'
          size={height * 0.04}
          color='white'
          style={{ marginRight: 4 }}
        />
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

      <View style={[styles.basic, { marginTop: '2.5%' }]}>
        <TouchableOpacity
          style={{
            width: '100%',
            padding: '3.5%',
            backgroundColor: colors.secondary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setShowAddSet(true);
          }}
        >
          <Text style={{ color: colors.primary }}>Add Set</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.basic,
          {
            flexDirection: 'row',
            height: height * 0.6,
            marginTop: '7.5%',
          },
        ]}
      >
        {/* Exercises */}
        <View
          style={[
            {
              flexDirection: 'column',
              width: width * 0.65,
            },
          ]}
        >
          <AppTitle text1='Exer' text2='cises' fontSize={height * 0.025} />
          <FlatList
            style={{ height: height * 0.6, overflow: 'hidden' }}
            data={exercisesList}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: height * 0.4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10%',
                  }}
                >
                  <MaterialIcons
                    name='fitness-center'
                    size={height * 0.05}
                    color={colors.primary + 'aa'}
                  />
                  <Text
                    style={{
                      color: colors.primary + 'aa',
                      fontSize: 14,
                      textAlign: 'center',
                      marginTop: '5%',
                    }}
                  >
                    No exercises added , please use the add sets button above
                  </Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <ExerciseCard
                  type={getType(index, exercisesList.length)}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  title={item.title}
                  exerciseType={item.type}
                  value={item.value + ''}
                  rest={item.rest + ''}
                  backgroundColor={item.backgroundColor}
                />
              );
            }}
          />
        </View>
        <View
          style={{
            width: 1,
            borderLeftColor: '#c7c7c777',
            borderLeftWidth: 1,
            marginHorizontal: width * 0.05,
            marginTop: '10%',
          }}
        />

        {/* Stats */}
        <View
          style={[
            {
              flexDirection: 'column',
              width: width * 0.2,
              marginTop: '10%',
              justifyContent: 'space-around',
            },
          ]}
        >
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, color: colors.secondary, fontWeight: 'bold' }}>
              Exercises
            </Text>
            <Text
              style={{ fontSize: 48, color: colors.primary, fontWeight: 'bold', marginTop: -6 }}
            >
              {exercisesList.length}
            </Text>
            {/* <Text style={{ fontSize: 14, color: colors.primary, fontWeight: 'bold' }}></Text> */}
          </View>

          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, color: colors.secondary, fontWeight: 'bold' }}>Time</Text>
            <Text
              style={{ fontSize: 48, color: colors.primary, fontWeight: 'bold', marginTop: -6 }}
            >
              {circuitStats.time}
            </Text>
            <Text
              style={{ fontSize: 14, color: colors.primary, fontWeight: 'bold', marginTop: -6 }}
            >
              mins
            </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, color: colors.secondary, fontWeight: 'bold' }}>Burn</Text>
            <Text
              style={{ fontSize: 40, color: colors.primary, fontWeight: 'bold', marginTop: -6 }}
            >
              {circuitStats.burn}
            </Text>
            <Text
              style={{ fontSize: 14, color: colors.primary, fontWeight: 'bold', marginTop: -6 }}
            >
              cal
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, color: colors.secondary, fontWeight: 'bold' }}>
              Intesity
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '70%',
              }}
            >
              <FontAwesome
                name='signal'
                size={44}
                color={
                  circuitStats.intensity == 'high'
                    ? '#c95362'
                    : circuitStats.intensity == 'medium'
                      ? '#c98253'
                      : '#f5da42'
                }
                style={{ marginLeft: 8, marginTop: 4 }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color:
                    circuitStats.intensity == 'high'
                      ? '#c95362'
                      : circuitStats.intensity == 'medium'
                        ? '#c98253'
                        : '#f5da42',
                  fontWeight: 'bold',
                }}
              >
                {circuitStats.intensity}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.basic,
          {
            width: width * 0.95,
            marginTop: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: height * 0.025,
          },
        ]}
      >
        <OutlinedButton title={'Clear'} onClick={() => {}} />
        <ContainedButton title={'Submit'} onClick={() => {}} />
      </View>

      <AddSetsModal
        modalVisible={showAddSets}
        handleModalClose={() => setShowAddSet(false)}
        handleSubmit={(obj) => {
          let setsArray = [...exercisesList];
          let setObj = { ...obj, backgroundColor: getRandomColor() };
          setsArray.push(setObj);
          setExercisesList(setsArray);
          setShowAddSet(false);
        }}
      />
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

  dropdown: {
    height: height * 0.05,
    borderColor: colors.primary,
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: colors.secondary,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#fff',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
