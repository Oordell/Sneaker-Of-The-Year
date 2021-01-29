import React, {FC} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import TopTenScreen from '../screens/TopTenScreen';
import {Icon} from 'react-native-elements';
import colors from '../config/colors';
import DragAndDropScreen from '../screens/DragAndDropScreen';

const Tab = createMaterialBottomTabNavigator();

interface Props {}

const AppNavigator: FC<Props> = () => {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor={colors.text}
      sceneAnimationEnabled={true}
      barStyle={{backgroundColor: colors.text_veryLight}}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="home"
              color={color}
              size={25}
              type="material-community"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Top 10"
        component={DragAndDropScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="trophy"
              color={color}
              size={25}
              type="material-community"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
