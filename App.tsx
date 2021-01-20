/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import colors from './app/config/colors';
import SignInScreen from './app/screens/SignInScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SignInScreen />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
