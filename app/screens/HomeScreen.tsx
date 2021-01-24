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

enum Categories {
  Brands = 0,
  Popular = 1,
  Year = 2,
}

enum Brands {
  Nike = 0,
  Jordan = 1,
  Adidas = 2,
  Yeezy = 3,
  NewBalance = 4,
  Asics = 5,
  Puma = 6,
  Converse = 7,
  Vans = 8,
  Reebok = 9,
  Saucony = 10,
  UnderArmour = 11,
}

enum Popular {
  Dunk = 0,
  Travis = 1,
  OffWhite = 2,
  Yeezy = 3,
  Sacai = 4,
  Jordan = 5,
}

enum Year {
  Y2010 = 2010,
  Y2011 = 2011,
  Y2012 = 2012,
  Y2013 = 2013,
  Y2014 = 2014,
  Y2015 = 2015,
  Y2016 = 2016,
  Y2017 = 2017,
  Y2018 = 2018,
  Y2019 = 2019,
  Y2020 = 2020,
  Y2021 = 2021,
}

interface Props {}

const HomeScreen: FC<Props> = () => {
  const {signOut} = useAuth();
  const [sneakers, setSneakers] = useState<readonly any[]>();

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [selectedPopular, setSelectedPopular] = useState<number>(-1);
  const [selectedYear, setSelectedYear] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);

  const buttonsCategories = [
    {_id: Categories.Brands, title: 'Brand'},
    {_id: Categories.Popular, title: 'Popular'},
    {_id: Categories.Year, title: 'Year'},
  ];
  const buttonsBrands = [
    {_id: Brands.Nike, imagePath: requireLogos.NIKE},
    {_id: Brands.Jordan, imagePath: requireLogos.JORDAN},
    {_id: Brands.Adidas, imagePath: requireLogos.ADIDAS},
    {_id: Brands.Yeezy, imagePath: requireLogos.YEEZY},
    {_id: Brands.NewBalance, imagePath: requireLogos.NEW_BALANCE},
    {_id: Brands.Asics, imagePath: requireLogos.ASICS},
    {_id: Brands.Puma, imagePath: requireLogos.PUMA},
    {_id: Brands.Converse, imagePath: requireLogos.CONVERSE},
    {_id: Brands.Vans, imagePath: requireLogos.VANS},
    {_id: Brands.Reebok, imagePath: requireLogos.REEBOK},
    {_id: Brands.Saucony, imagePath: requireLogos.SAUCONY},
    {_id: Brands.UnderArmour, imagePath: requireLogos.UNDER_ARMOUR},
  ];
  const buttonsPopular = [
    {_id: Popular.Dunk, imagePath: requireSneaker.DUNK, title: 'DUNK'},
    {_id: Popular.Travis, imagePath: requireSneaker.TRAVIS, title: 'TRAVIS'},
    {
      _id: Popular.OffWhite,
      imagePath: requireSneaker.OFF_WHITE,
      title: 'OFF-WHITE',
    },
    {_id: Popular.Yeezy, imagePath: requireSneaker.YEEZY, title: 'YEEZY'},
    {_id: Popular.Sacai, imagePath: requireSneaker.SACAI, title: 'SACAI'},
    {_id: Popular.Jordan, imagePath: requireSneaker.JORDAN, title: 'JORDAN'},
  ];
  const buttonsYear = [
    {_id: Year.Y2010, title: '2010'},
    {_id: Year.Y2011, title: '2011'},
    {_id: Year.Y2012, title: '2012'},
    {_id: Year.Y2013, title: '2013'},
    {_id: Year.Y2014, title: '2014'},
    {_id: Year.Y2015, title: '2015'},
    {_id: Year.Y2016, title: '2016'},
    {_id: Year.Y2017, title: '2017'},
    {_id: Year.Y2018, title: '2018'},
    {_id: Year.Y2019, title: '2019'},
    {_id: Year.Y2020, title: '2020'},
    {_id: Year.Y2021, title: '2021'},
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
    if (selectedCategory === Categories.Brands) {
      return (
        <RadioButtonGroup
          buttons={buttonsBrands}
          selectedButton={selectedBrand}
          onPress={(btn) => handleBrandPressed(btn)}
        />
      );
    } else if (selectedCategory === Categories.Popular) {
      return (
        <RadioButtonGroup
          buttons={buttonsPopular}
          selectedButton={selectedPopular}
          onPress={(btn) => setSelectedPopular(btn)}
        />
      );
    } else if (selectedCategory === Categories.Year) {
      return (
        <RadioButtonGroup
          buttons={buttonsYear}
          selectedButton={selectedYear}
          onPress={(btn) => setSelectedYear(btn)}
        />
      );
    }
  };

  const handleBrandPressed = async (brand: Brands) => {
    setSelectedBrand(brand);
    let reqBrand: string;
    let reqName: string;
    if (brand === Brands.Nike) reqBrand = brands.NIKE;
    if (brand === Brands.Jordan) reqBrand = brands.JORDAN;
    if (brand === Brands.Adidas) reqBrand = brands.ADIDAS;
    if (brand === Brands.Yeezy) reqName = brands.YEEZY;
    if (brand === Brands.NewBalance) reqBrand = brands.NEW_BALANCE;
    if (brand === Brands.Asics) reqBrand = brands.ASICS;
    if (brand === Brands.Puma) reqBrand = brands.PUMA;
    if (brand === Brands.Converse) reqBrand = brands.CONVERSE;
    if (brand === Brands.Vans) reqBrand = brands.VANS;
    if (brand === Brands.Reebok) reqBrand = brands.REEBOK;
    if (brand === Brands.Saucony) reqBrand = brands.SAUCONY;
    if (brand === Brands.UnderArmour) reqBrand = brands.UNDER_ARMOUR;
    const sneakers = await sneakerDb.getSneakers({
      limit: 10,
      brand: reqBrand,
      name: reqName,
      page: page,
    });
    setSneakers(sneakers);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        style={styles.list}
        data={sneakers}
        numColumns={2}
        keyExtractor={(sneaker) => sneaker.id.toString()}
        ListHeaderComponent={
          <>
            <RadioButtonGroup
              buttons={buttonsCategories}
              selectedButton={selectedCategory}
              onPress={(btn) => setSelectedCategory(btn)}
            />
            {categorySelection()}
          </>
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
