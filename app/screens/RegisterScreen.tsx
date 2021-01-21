import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import auth from '../api/auth';
import {useAuth} from '../hooks/useAuth';
import logger from '../utility/logger';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

interface Props {}

const RegisterScreen: FC<Props> = () => {
  const [error, setError] = useState<string>('');
  const {signIn} = useAuth();

  const handleSubmit = async ({name, email, password}) => {
    try {
      const token = await auth.createUserFromEmailAndGetAuthToken(
        email,
        password,
        name,
      );

      signIn(token);
    } catch (error) {
      logger.logErrorAndMessage(error, 'Error trying to create a new user.');
    }
  };

  return (
    <Screen style={styles.container}>
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
