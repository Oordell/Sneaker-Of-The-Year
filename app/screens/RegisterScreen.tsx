import React, {FC, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import authApi from '../api/auth';
import {useAuth} from '../hooks/useAuth';
import logger from '../utility/logger';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

interface Props {}

const RegisterScreen: FC<Props> = () => {
  const [error, setError] = useState<string>('');
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);
  const {signIn} = useAuth();

  const handleSubmit = async ({name, email, password}) => {
    setSubmitPressed(true);
    try {
      const token = await authApi.createUserFromEmailAndGetAuthToken(
        email,
        password,
        name,
      );

      setSubmitPressed(false);
      signIn(token);
    } catch (error) {
      setSubmitPressed(false);
      setError(error);
      logger.logErrorAndMessage(error, 'Error trying to create a new user.');
    }
  };

  return (
    <Screen style={styles.container}>
      {submitPressed ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={colors.text_light} />
        </View>
      ) : (
        <>
          <AppForm
            initialValues={{name: '', email: '', password: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={error} visible={error} />
            <AppFormField
              autoCorrect={false}
              iconName="account"
              name="name"
              placeholder="Name"
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
            <SubmitButton title="Submit" iconName="account-multiple-plus" />
          </AppForm>
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    width: '95%',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
