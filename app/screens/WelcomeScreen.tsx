import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/buttons/AppButton';
import Screen from '../components/Screen';

interface Props {}

const WelcomeScreen: FC<Props> = () => {
  const handleRegisterPressed = () => {
    console.log('Register Pressed.');
  };

  const handleSignInPressed = () => {
    console.log('Sign In Pressed.');
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.heading}>Sneaker Of The Year</AppText>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Register"
          color="primary"
          onPress={handleRegisterPressed}
          iconName="account-plus"
        />
        <AppButton
          title="Sign in"
          color="primary"
          onPress={handleSignInPressed}
          iconName="login"
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
