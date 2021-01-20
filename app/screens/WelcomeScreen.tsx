import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/buttons/AppButton';
import Screen from '../components/Screen';

interface Props {}

const WelcomeScreen: FC<Props> = () => {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.heading}>Sneaker Of The Year</AppText>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Hello"
          color="primary"
          onPress={() => console.log('Pressed')}
          iconName="google"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '95%',
  },
  container: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    top: 50,
  },
});

export default WelcomeScreen;
