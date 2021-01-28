import React, {FC} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import TopTenScreen from '../screens/TopTenScreen';

const Tab = createMaterialBottomTabNavigator();

interface Props {}

const AppNavigator: FC<Props> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Top 10" component={TopTenScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
