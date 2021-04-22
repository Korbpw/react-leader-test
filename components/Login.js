import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Logo from '../assets/logo.svg';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

import api from '../utils/api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width;

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um Email válido')
    .required('Digite um Email'),
  password: yup.string().required('Digite uma senha'),
});

const Login = props => {
  const [splash, setSplash] = useState(true);
  return splash ? (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          setSplash(false);
        }}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.form}>
        <Formik
          validationS
          chema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={async (values, {setSubmitting, setErrors}) => {
            try {
              const response = await api.post('/api-token-auth/', {
                email: values.email,
                password: values.password,
              });
              if (response.data.token) {
                RNSecureStorage.set(
                  'token',
                  JSON.stringify(response.data.token),
                  {
                    accessible: ACCESSIBLE.WHEN_UNLOCKED,
                  },
                );
                props.navigation.replace('User');
              }
            } catch (_err) {
              console.log(_err);
              setErrors({
                email: 'Credenciais inválidas',
                password: ' ',
              });
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <Text style={styles.label}>
                <Icon name="user" size={15} color="#999" />
                 Email
              </Text>
              <TextInput
                style={errors.email ? styles.inputError : styles.input}
                onChangeText={handleChange('email')}
                value={values.email}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                placeholder="Ex: Fulano@mail.com"
                placeholderTextColor="#656565"
              />
              {errors.email && (
                <Text style={{fontSize: 10, color: '#F95858'}}>
                  {errors.email}
                </Text>
              )}
              <Text style={styles.label}>
                <Icon name="lock" size={15} color="#999" />
                 Senha
              </Text>
              <TextInput
                style={errors.password ? styles.inputError : styles.input}
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={handleBlur('password')}
                secureTextEntry
                placeholder="*********"
                placeholderTextColor="#656565"
              />
              {errors.password && (
                <Text style={{fontSize: 10, color: '#F95858'}}>
                  {errors.password}
                </Text>
              )}
              <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <Logo style={styles.logo} width={windowWidth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
  },
  input: {
    height: 50,
    width: windowWidth - 75,
    paddingHorizontal: 20,
    marginTop: 5,
    borderWidth: 0,
    color: 'white',
    backgroundColor: '#2D2D2D',
    borderRadius: 5,
  },
  inputError: {
    height: 50,
    width: windowWidth - 50,
    paddingHorizontal: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#F95858',
    color: 'white',
    backgroundColor: '#2D2D2D',
    borderRadius: 5,
  },
  form: {
    marginTop: windowHeight / 3,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    width: windowWidth - 75,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,

    backgroundColor: '#529DDC',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    color: '#909090',
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});

export default Login;
