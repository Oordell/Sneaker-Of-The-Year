/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import colors from './app/config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthNavigatior from './app/navigation/AuthNavigatior';
import navigationTheme from './app/navigation/navigationTheme';
import AuthContext from './app/auth/context';
import HomeScreen from './app/screens/HomeScreen';

Icon.loadFont();

const App = () => {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        {user ? <HomeScreen /> : <AuthNavigatior />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
