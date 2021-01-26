import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const SneakerDetailsScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>SneakerDetailsScreen</Text>
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

export default SneakerDetailsScreen;
