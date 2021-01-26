import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routs from './routs';
import HomeScreen from '../screens/HomeScreen';
import SneakerDetailsScreen from '../screens/SneakerDetailsScreen';

interface Props {}

const Stack = createStackNavigator();

const HomeNavigator: FC<Props> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routs.HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routs.SNEAKER_DETAILS}
        component={SneakerDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
