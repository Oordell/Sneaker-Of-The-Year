import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import snkrBrand from '../api/sneakerBrands';
import sneakerDb from '../api/sneakerDb';
import Screen from '../components/Screen';
import {useAuth} from '../hooks/useAuth';
import authApi from '../api/auth';
import RadioButtonGroup from '../components/buttons/RadioButtonGroup';
import AppButton from '../components/buttons/AppButton';
import ListItem from '../components/ListItem';
import sneakerCategories from '../api/sneakerCategories';
import RadioButtonPresets from '../components/buttons/RadioButtonPresets';
import snkrPopular from '../api/sneakerPopular';
import routs from '../navigation/routs';

interface Props {
  [propName: string]: any;
}

interface ReqParams {
  page?: number;
  sku?: string;
  name?: string;
  silhouette?: string;
  brand?: string;
  gender?: string;
  colorway?: string;
  releaseDate?: string;
  releaseYear?: number;
  sort?: string;
}

const pageLimit: number = 20;

const HomeScreen: FC<Props> = ({navigation}) => {
  const {signOut} = useAuth();
  const [sneakers, setSneakers] = useState<any[]>();
  const [countOfSneakers, setCountOfSneakers] = useState<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [selectedPopular, setSelectedPopular] = useState<number>(-1);
  const [selectedYear, setSelectedYear] = useState<number>(-1);

  const [reqParam, setReqParam] = useState<ReqParams>({page: 0});

  useEffect(() => {
    loadInitialSneakers();
  }, []);

  useEffect(() => {
    loadNewSneakers();
  }, [reqParam]);

  const loadNewSneakers = async () => {
    const newSneakers = await sneakerDb.getSneakers({
      limit: pageLimit,
      ...reqParam,
    });

    //console.log('Sneaker response: ', newSneakers);

    if (reqParam.page === 0) {
      setSneakers(newSneakers.results);
      setCountOfSneakers(newSneakers.count);
    } else {
      setSneakers([...sneakers, ...newSneakers.results]);
    }
  };

  const loadInitialSneakers = async () => {
    const sneakers = await sneakerDb.getSneakers({
      limit: pageLimit,
      brand: 'nike',
      releaseYear: 2020,
    });
    setCountOfSneakers(sneakers.count);
    setSneakers(sneakers.results);
  };

  const handleSignOutPressed = () => {
    authApi.signOut();
    signOut();
  };

  const categorySelection = () => {
    if (selectedCategory === sneakerCategories.BRANDS._id) {
      return (
        <RadioButtonGroup
          buttons={RadioButtonPresets.btnsBrands}
          selectedButton={selectedBrand}
          onPress={(btn) => handleSelectedBrandPressed(btn)}
        />
      );
    } else if (selectedCategory === sneakerCategories.POPULAR._id) {
      return (
        <RadioButtonGroup
          buttons={RadioButtonPresets.btnsPopular}
          selectedButton={selectedPopular}
          onPress={(btn) => handleSelectedPopularPressed(btn)}
        />
      );
    } else if (selectedCategory === sneakerCategories.YEAR._id) {
      return (
        <RadioButtonGroup
          buttons={RadioButtonPresets.btnsYear}
          selectedButton={selectedYear}
          onPress={(btn) => handleSelectedYearPressed(btn)}
        />
      );
    }
  };

  const handleSelectedBrandPressed = (btn: number) => {
    setSelectedBrand(btn);
    handleSetSneakerBrandReq(btn);
  };

  const handleSelectedPopularPressed = (btn: number) => {
    setSelectedPopular(btn);
    handleSetSneakerPopularReq(btn);
  };

  const handleSelectedYearPressed = (btn: number) => {
    setSelectedYear(btn);
    handleSetSneakerYearReq(btn);
  };

  const handleSetSneakerBrandReq = (brandId: number) => {
    let name: string;
    let brand: string;

    for (let brandObj in snkrBrand) {
      if (snkrBrand[brandObj]._id === brandId) {
        if (snkrBrand.YEEZY._id === brandId) {
          name = snkrBrand[brandObj].name;
          brand = snkrBrand.ADIDAS.name;
        } else {
          brand = snkrBrand[brandObj].name;
        }
      }
    }

    const params: ReqParams = {
      ...reqParam,
      page: 0,
      brand: brand,
      name: name,
    };
    setReqParam(params);
  };

  const handleSetSneakerPopularReq = (popularId: number) => {
    let name: string;
    let brand: string;

    for (let popular in snkrPopular) {
      if (snkrPopular[popular]._id === popularId) {
        brand = snkrPopular[popular].brand;
        if (popularId !== snkrPopular.JORDAN._id)
          name = snkrPopular[popular].name;
      }
    }

    const params: ReqParams = {
      ...reqParam,
      page: 0,
      name: name,
      brand: brand,
    };
    setReqParam(params);
  };

  const handleSetSneakerYearReq = (yearId: number) => {
    const params: ReqParams = {
      ...reqParam,
      page: 0,
      releaseYear: yearId,
    };
    setReqParam(params);
  };

  const handleLoadMorePressed = () => {
    let params = {...reqParam};
    params.page += 1;
    setReqParam(params);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        style={styles.list}
        data={sneakers}
        numColumns={2}
        keyExtractor={(sneaker) => sneaker.links.toString()}
        ListHeaderComponent={
          <>
            <RadioButtonGroup
              buttons={RadioButtonPresets.btnsCategories}
              selectedButton={selectedCategory}
              onPress={(btn) => setSelectedCategory(btn)}
            />
            {categorySelection()}
          </>
        }
        ListFooterComponent={
          <>
            <AppButton title="Load more" onPress={handleLoadMorePressed} />
            <AppButton title="Sign out" onPress={handleSignOutPressed} />
          </>
        }
        renderItem={({item}) => (
          <ListItem
            sneaker={item}
            onPress={() => navigation.navigate(routs.SNEAKER_DETAILS, item)}
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
