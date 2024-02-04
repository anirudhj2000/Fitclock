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

const { height, width } = Dimensions.get('window');

const Login = () => {
  const [showSignUp, setShowSignUp] = React.useState<boolean>(false);
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
              padding: '2.5%',
              marginBottom: '5%',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              console.log('clicked');
            }}
            style={{
              backgroundColor: '#fff',
              padding: '3.5%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
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
            <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
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
                fontWeight: 'bold',
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
            marginTop: '2.5%',
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
            <Text style={{ textDecorationLine: 'underline', color: colors.primary }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
          <Text style={{ color: colors.primary }}> and </Text>
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
            <Text style={{ textDecorationLine: 'underline', color: colors.primary }}>
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
