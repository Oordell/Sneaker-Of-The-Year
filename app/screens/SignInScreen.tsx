import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import AppButton from '../components/buttons/AppButton';
import Screen from '../components/Screen';

interface Props {}

const SignInScreen: FC<Props> = () => {
  const handleFacebookPressed = () => {
    console.log('Facebook pressed.');
  };

  const handleGooglePressed = () => {
    console.log('Google pressed.');
  };

  return (
    <Screen style={styles.container}>
      <AppButton
        title="Sign in with Facebook"
        iconName="facebook"
        onPress={handleFacebookPressed}
      />
      <AppButton
        title="Sign in with Google"
        iconName="google"
        onPress={handleGooglePressed}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
  },
});

export default SignInScreen;
