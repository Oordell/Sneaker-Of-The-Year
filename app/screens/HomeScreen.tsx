import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import authApi from '../api/auth';
import sneakerDb from '../api/sneakerDb';
import AppText from '../components/AppText';
import AppButton from '../components/buttons/AppButton';
import Screen from '../components/Screen';
import {useAuth} from '../hooks/useAuth';

interface Props {}

const HomeScreen: FC<Props> = () => {
  const {user, signOut} = useAuth();
  const [sneakers, setSneakers] = useState<{}>();

  useEffect(() => {
    loadSneakers();
  }, []);

  const loadSneakers = async () => {
    const sneakers = await sneakerDb.get10RandomSneakers();
    setSneakers(sneakers);
  };

  const handleSignOutPressed = () => {
    authApi.signOut();
    signOut();
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={sneakers}
        keyExtractor={(sneaker) => sneaker.id.toString()}
        ListFooterComponent={
          <AppButton title="Sign out" onPress={handleSignOutPressed} />
        }
        renderItem={({item}) => (
          <View style={{alignItems: 'center'}}>
            <AppText>{item.title}</AppText>
            <Image
              style={{width: 140, height: 100, resizeMode: 'cover'}}
              source={{uri: item.media.thumbUrl}}
            />
          </View>
        )}
      />
    </Screen>
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
