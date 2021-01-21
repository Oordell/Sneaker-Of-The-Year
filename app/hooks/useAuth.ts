import {useContext} from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';

export const useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const signIn = (authToken: string) => {
    const user = jwtDecode(authToken);
    authStorage.storeToken(authToken);
    setUser(user);
  };

  const signOut = () => {
    authStorage.removeToken();
    setUser(null);
  };

  return {user, signIn, signOut};
};
