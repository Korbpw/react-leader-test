import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import LottieView from 'lottie-react-native';

import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;

const User = props => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/success.json')}
        autoPlay
        loop={false}
        height={400}
        width={400}
      />

      <Text style={styles.title}>Autenticado</Text>
      <Text style={styles.body}>
        Se você vê essa tela, significa que você foi autenticado com sucesso,
        Olá amigo!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 200,
    fontSize: 40,
    color: '#656565',
    marginBottom: 5,
    fontWeight: '300',
  },
  body: {
    fontSize: 20,
    color: '#656565',
  },
  logoffBtn: {
    width: windowWidth - 290,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,

    backgroundColor: '#F95858',
  },
  logoffText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default User;
