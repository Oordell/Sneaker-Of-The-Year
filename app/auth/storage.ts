import jwtDecode from 'jwt-decode';
import * as Keychain from 'react-native-keychain';
import logger from '../utility/logger';

const keyToken = 'authToken';

const storeToken = async (authToken: string) => {
  try {
    await Keychain.setGenericPassword(keyToken, authToken);
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error trying to store the token in secure storage.',
    );
  }
};

const getToken = async () => {
  try {
    const res = await Keychain.getGenericPassword();
    if (res) return res.password;
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error trying to get the token from secure storage.',
    );
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error trying to delete the token from secure storage.',
    );
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
  getUser,
};
