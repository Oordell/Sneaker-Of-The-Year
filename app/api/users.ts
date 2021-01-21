import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import logger from '../utility/logger';
import apiEndpoints from './endpoints';

const dbRef = firestore().collection(apiEndpoints.USERS);

interface UserInfo {
  name?: string;
  email: string;
  isAdmin?: boolean;
}

const createNewOrUpdateUser = async (userInfo: UserInfo) => {
  try {
    const currentUser = firebaseAuth().currentUser;
    const targetDoc = dbRef.doc(currentUser.uid);

    const user = await targetDoc.get();
    if (user.exists) {
      // User already exists in DB.
      await targetDoc.update({
        last_signin: firestore.Timestamp.now(),
      });
      return;
    }

    // New user in DB:
    await targetDoc.set({
      name: userInfo.name
        ? userInfo.name
        : currentUser.displayName
        ? currentUser.displayName
        : '',
      email: userInfo.email,
      isAdmin: userInfo.isAdmin ? userInfo.isAdmin : false,
      lastSignin: firestore.Timestamp.now(),
    });
  } catch (error) {
    logger.logErrorAndMessage(error, 'Error storing the user in Firestore.');
  }
};

export default {
  createNewOrUpdateUser,
};
