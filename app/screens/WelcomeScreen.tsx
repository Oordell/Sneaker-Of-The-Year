import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/buttons/AppButton';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from '../components/forms';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

interface Props {}

const WelcomeScreen: FC<Props> = () => {
  const [signInFailed, setSignInFailed] = useState<boolean>(false);

  const handleSignInPressed = async ({email, password}) => {
    console.log('Sign In Pressed.');
    setSignInFailed(!signInFailed);
  };

  const handleRegisterPressed = () => {
    console.log('Register Pressed.');
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.heading}>Sneaker Of The Year</AppText>

      <View style={styles.buttonContainer}>
        <AppForm
          initialValues={{email: '', password: ''}}
          onSubmit={handleSignInPressed}
          validationSchema={validationSchema}>
          <ErrorMessage
            error="Invalid email and/or password."
            visible={signInFailed}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            iconName="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            iconName="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Sign in" iconName="login" />
        </AppForm>
        <AppButton
          title="Register"
          color="primary"
          onPress={handleRegisterPressed}
          iconName="account-plus"
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
