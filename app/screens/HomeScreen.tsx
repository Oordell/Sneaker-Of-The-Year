import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const HomeScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
