import firebaseAuth from '@react-native-firebase/auth';
import logger from '../utility/logger';
import usersApi from './users';

const createUserFromEmailAndGetAuthToken = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const result = await firebaseAuth().createUserWithEmailAndPassword(
      email,
      password,
    );

    const currentUser = firebaseAuth().currentUser;
    currentUser.updateProfile({
      displayName: name,
    });

    await usersApi.createNewOrUpdateUser({name, email});

    return await result.user.getIdToken();
  } catch (error) {
    logger.logErrorAndMessage(error, `Error trying to create new user`);
  }
};

const signInWithEmailAndGetAuthToken = async (
  email: string,
  password: string,
) => {
  try {
    const result = await firebaseAuth().signInWithEmailAndPassword(
      email,
      password,
    );

    await usersApi.createNewOrUpdateUser({email});

    return await result.user.getIdToken();
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      `Error trying to sign in user with email and password`,
    );
  }
};

const signOut = async () => {
  try {
    await firebaseAuth().signOut();
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      `Error trying to sign out user from firebase`,
    );
  }
};

export default {
  createUserFromEmailAndGetAuthToken,
  signInWithEmailAndGetAuthToken,
  signOut,
};
