import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import AppTitle from '../components/AppTitle';
import LoginForm from '../components/loginForm';
import SignupModal from '../components/SignupModal';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import useUserStore from '../utils/store';
import { checkIfUserExists } from '../components/SignupModal';

const { height, width } = Dimensions.get('window');

GoogleSignin.configure({
  webClientId: '318235095807-554pip4odrbv9cqqfn0fqq996h34b99k.apps.googleusercontent.com',
});

const Login = () => {
  const [showSignUp, setShowSignUp] = React.useState<boolean>(false);
  const updateUser = useUserStore((state) => state.updateUser);

  const AddUserData = (data: any) => {
    firestore()
      .collection('User')
      .doc(data.user.email)
      .set({
        email: data.user.email,
        image: data.user.photoURL,
        name: data.user.displayName,
        joinedOn: new Date(),
        onboarded: false,
        userInfo: {
          weight: '',
          height: '',
          frequency: '',
        },
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Login Successfull!',
          position: 'top',
        });
        console.log('user l;ogin called');
        AsyncStorage.setItem(
          'user',
          JSON.stringify({
            email: data.user.email,
            image: data.user.photoURL,
            name: data.user.displayName,
          }),
        );
        updateUser({
          email: data.user.email,
          image: data.user.photoURL,
          name: data.user.displayName,
        });
      });
  };

  const HandleSignIn = () => {
    onGoogleButtonPress()
      .then((res) => {
        if (res?.user?.email) {
          checkIfUserExists(res?.user?.email)
            .then((exists) => {
              if (!exists) {
                AddUserData(res);
              } else {
                Toast.show({
                  type: 'success',
                  text1: 'Login Successfull!',
                  position: 'top',
                });
                console.log(
                  'user l;ogin 1',
                  JSON.stringify({
                    email: res.user.email,
                    image: res.user.photoURL,
                    name: res.user.displayName,
                  }),
                );
                AsyncStorage.setItem(
                  'user',
                  JSON.stringify({
                    email: res.user.email,
                    image: res.user.photoURL,
                    name: res.user.displayName,
                  }),
                );
                // updateUser({
                //   email: res.user.email,
                //   image: res.user.photoURL,
                //   name: res.user.displayName,
                // });
              }
            })
            .catch((err) => {
              auth().signOut();
              //   updateUser(null);
              AsyncStorage.clear();
              //   Toast.show({
              //     type: 'error',
              //     text1: 'Some error has occurred!',
              //     position: 'top',
              //   });
            });
        }

        // Toast.show({
        //   type: 'success',
        //   text1: 'Login Successfull!',
        //   position: 'top',
        // });
        // console.log('user l;ogin 2', res);
        // AsyncStorage.setItem('user', JSON.stringify(res));
        // updateUser(res);
      })
      .catch((err) => {
        console.log('login err', err);
        auth().signOut();
        Toast.show({
          type: 'error',
          text1: 'Some error has occurred!',
          position: 'top',
        });
        updateUser(null);
        AsyncStorage.clear();
      });
  };

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'black'}
        barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <Image
        source={require('../../assets/loginBackground.jpeg')}
        resizeMode={'contain'}
        style={[
          { height: '100%', width: '100%', position: 'absolute', opacity: 0.4 },
          { transform: [{ scale: 1.8 }] },
        ]}
      />
      <View style={[styles.basic, { marginTop: '5%', marginHorizontal: '2.5%' }]}>
        <AppTitle text1='FIT' text2='CLOCK' fontSize={48} />
      </View>
      <View>
        <View
          style={[
            styles.basic,
            {
              marginHorizontal: '2.5%',
              display: 'flex',
              flexDirection: 'column',
              height: height * 0.4,
              backgroundColor: '#000000',
              borderWidth: 0.3,
              borderColor: colors.secondary,
              paddingHorizontal: '2.5%',
              paddingVertical: '2.5%',
              marginBottom: '5%',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              console.log('clicked');
              onGoogleButtonPress();
            }}
            style={{
              backgroundColor: '#fff',
              padding: '3.5%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2.5%',
              marginBottom: '2.5%',
            }}
          >
            <Image
              source={require('../../assets/search.png')}
              style={{
                height: 16,
                width: 16,
                marginHorizontal: '2.5%',
              }}
            />
            <Text style={{ color: '#000', fontSize: 14, fontFamily: 'Inter_700Bold' }}>
              Login with Google
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: width * 0.4,
                borderBottomColor: '#c7c7c7',
                borderBottomWidth: 1,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Inter_700Bold',
                marginVertical: '2.5%',
                color: colors.primary,
              }}
            >
              OR
            </Text>
            <View
              style={{
                width: width * 0.4,
                borderBottomColor: '#c7c7c7',
                borderBottomWidth: 1,
              }}
            />
          </View>
          <LoginForm
            onPressSignup={() => {
              setShowSignUp(true);
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '2.5%',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.canOpenURL(
                'https://www.termsandconditionsgenerator.com/live.php?token=l4gKaE1cDYxZaX83bKNnod3VmWZOuasq',
              ).then((supports) => {
                if (supports)
                  Linking.openURL(
                    'https://www.termsandconditionsgenerator.com/live.php?token=l4gKaE1cDYxZaX83bKNnod3VmWZOuasq',
                  );
              })
            }
          >
            <Text
              style={{
                textDecorationLine: 'underline',
                fontFamily: 'Inter_400Regular',
                color: colors.primary,
              }}
            >
              Terms and Conditions
            </Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Inter_400Regular', color: colors.primary }}> and </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.canOpenURL(
                'https://www.termsfeed.com/live/0259560d-f1d3-45b3-b333-1c0baf313857',
              ).then((supports) => {
                if (supports)
                  Linking.openURL(
                    'https://www.termsfeed.com/live/0259560d-f1d3-45b3-b333-1c0baf313857',
                  );
              })
            }
          >
            <Text
              style={{
                fontFamily: 'Inter_400Regular',
                textDecorationLine: 'underline',
                color: colors.primary,
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: 'absolute', width: '100%' }}>
        <SignupModal
          modalVisible={showSignUp}
          handleModalClose={() => {
            setShowSignUp(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  basic: {
    display: 'flex',
    marginHorizontal: '2.5%',
  },
});
