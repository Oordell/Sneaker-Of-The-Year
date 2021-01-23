import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import authApi from '../api/auth';
import brands from '../api/sneakerBrands';
import sneakerDb from '../api/sneakerDb';
import requireLogos from '../assets/brandLogos/requireLogos';
import requireSneaker from '../assets/sneakers/requireSneaker';
import AppButton from '../components/buttons/AppButton';
import RadioButtonGroup from '../components/buttons/RadioButtonGroup';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import {useAuth} from '../hooks/useAuth';

interface Props {}

const HomeScreen: FC<Props> = () => {
  const {signOut} = useAuth();
  const [sneakers, setSneakers] = useState<readonly any[]>();

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<number>(-1);
  const [selectedPopular, setSelectedPopular] = useState<number>(-1);

  const buttonsCategories = [
    {_id: 0, title: 'Brand'},
    {_id: 1, title: 'Popular'},
    /* {_id: 2, title: 'Model'}, */
  ];
  const buttonsBrands = [
    {_id: 0, imagePath: requireLogos['NIKE']},
    {_id: 1, imagePath: requireLogos['JORDAN']},
    {_id: 2, imagePath: requireLogos['ADIDAS']},
    {_id: 3, imagePath: requireLogos['YEEZY']},
    {_id: 4, imagePath: requireLogos['NEW_BALANCE']},
    {_id: 5, imagePath: requireLogos['ASICS']},
    {_id: 6, imagePath: requireLogos['PUMA']},
    {_id: 7, imagePath: requireLogos['REEBOK']},
    {_id: 8, imagePath: requireLogos['VANS']},
    {_id: 9, imagePath: requireLogos['SAUCONY']},
    {_id: 10, imagePath: requireLogos['CONVERSE']},
    {_id: 11, imagePath: requireLogos['UNDER_ARMOUR']},
  ];
  const buttonsPopular = [
    {_id: 0, imagePath: requireSneaker['DUNK']},
    {_id: 1, imagePath: requireSneaker['TRAVIS']},
    /* {_id: 2, imagePath: 'OFF_WHITE'},
    {_id: 3, imagePath: 'YEEZY'},
    {_id: 4, imagePath: 'SACAI'},
    {_id: 5, imagePath: 'JORDAN'}, */
  ];

  useEffect(() => {
    loadSneakers();
    setSelectedCategory(0);
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

  const categorySelection = () => {
    if (selectedCategory === 0) {
      return (
        <RadioButtonGroup
          buttons={buttonsBrands}
          selectedButton={selectedBrand}
          onPress={(btn) => setSelectedBrand(btn)}
        />
      );
    } else if (selectedCategory === 1) {
      return (
        <RadioButtonGroup
          buttons={buttonsPopular}
          selectedButton={selectedPopular}
          onPress={(btn) => setSelectedPopular(btn)}
        />
      );
    }
  };

  return (
    <Screen style={styles.container}>
      <RadioButtonGroup
        buttons={buttonsCategories}
        selectedButton={selectedCategory}
        onPress={(btn) => setSelectedCategory(btn)}
      />
      {categorySelection()}
      <FlatList
        style={styles.list}
        data={sneakers}
        numColumns={2}
        keyExtractor={(sneaker) => sneaker.id.toString()}
        /* ListHeaderComponent={
          <AppButton title="Get sneakers" onPress={loadSneakers} />
        } */
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
