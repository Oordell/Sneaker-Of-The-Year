import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routs from './routs';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

interface Props {}

const AuthNavigatior: FC<Props> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routs.WELCOME}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name={routs.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigatior;
