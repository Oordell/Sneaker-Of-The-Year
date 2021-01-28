/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import colors from './app/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthNavigatior from './app/navigation/AuthNavigatior';
import navigationTheme from './app/navigation/navigationTheme';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import HomeNavigator from './app/navigation/HomeNavigator';
import AppNavigator from './app/navigation/AppNavigator';

Icon.loadFont();

const App = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        {user ? <AppNavigator /> : <AuthNavigatior />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
