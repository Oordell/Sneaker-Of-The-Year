import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import authApi from '../api/auth';
import brands from '../api/sneakerBrands';
import sneakerDb from '../api/sneakerDb';
import AppButton from '../components/buttons/AppButton';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import {useAuth} from '../hooks/useAuth';

interface Props {}

const HomeScreen: FC<Props> = () => {
  const {signOut} = useAuth();
  const [sneakers, setSneakers] = useState<readonly any[]>();

  useEffect(() => {
    loadSneakers();
  }, []);

  const loadSneakers = async () => {
    const sneakers = await sneakerDb.getSneakers({
      limit: 10,
      brand: brands.NIKE,
      name: 'off white',
      releaseYear: 2020,
    });
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
        ListHeaderComponent={
          <AppButton title="Get sneakers" onPress={loadSneakers} />
        }
        ListFooterComponent={
          <AppButton title="Sign out" onPress={handleSignOutPressed} />
        }
        renderItem={({item}) => (
          <ListItem
            brand={item.brand}
            name={item.name}
            media={item.media}
            shoe={item.shoe}
            title={item.title}
            year={item.year}
            releaseDate={item.releaseDate}
            retailPrice={item.retailPrice}
          />
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
