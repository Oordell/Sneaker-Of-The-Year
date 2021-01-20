import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Screen from '../components/Screen';

interface Props {}

const RegisterScreen: FC<Props> = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
