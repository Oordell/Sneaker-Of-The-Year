import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import auth from '../api/auth';
import AppButton from '../components/buttons/AppButton';
import {useAuth} from '../hooks/useAuth';

interface Props {}

const HomeScreen: FC<Props> = () => {
  const {signOut} = useAuth();

  const handleSignOutPressed = () => {
    auth.signOut();
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <AppButton title="Sign out" onPress={handleSignOutPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
