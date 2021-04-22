import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = RNSecureStorage.exists('token');
    RNSecureStorage.get('token')
      .then(value => {
        this.props.navigation.navigate('App');
      })
      .catch(err => {
        this.props.navigation.navigate('Auth');
        console.log(err);
      });
  };

  // Render any loading content that you like here
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
