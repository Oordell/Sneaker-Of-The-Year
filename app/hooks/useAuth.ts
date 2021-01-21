import {useContext} from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from '../auth/context';

export const useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const signIn = (authToken: string) => {
    const user = jwtDecode(authToken);
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return {user, signIn, signOut};
};
