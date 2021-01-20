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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthNavigatior from './app/navigation/AuthNavigatior';
import navigationTheme from './app/navigation/navigationTheme';

Icon.loadFont();

const App = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AuthNavigatior />
    </NavigationContainer>
  );
};

export default App;
