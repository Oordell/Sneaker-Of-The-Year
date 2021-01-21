import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import authApi from '../api/auth';
import sneakerDb from '../api/sneakerDb';
import AppText from '../components/AppText';
import AppButton from '../components/buttons/AppButton';
import {useAuth} from '../hooks/useAuth';

interface Props {}

const HomeScreen: FC<Props> = () => {
  const {user, signOut} = useAuth();

  const handleSignOutPressed = () => {
    authApi.signOut();
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <AppText>UserName: {user.name}</AppText>
      <AppButton
        title="get sneakers"
        onPress={() => sneakerDb.get10RandomSneakers()}
      />
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
