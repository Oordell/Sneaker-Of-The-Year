/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import colors from './app/config/colors';
import RegisterScreen from './app/screens/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <RegisterScreen />
    </NavigationContainer>
  );
};

export default App;
