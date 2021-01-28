import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const TopTenScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>TopTenScreen</Text>
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

export default TopTenScreen;
