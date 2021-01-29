import React, {FC} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import usersApi from '../api/users';
import AppText from '../components/AppText';
import AppButtonSmall from '../components/buttons/AppButtonSmall';
import Screen from '../components/Screen';
import colors from '../config/colors';
import defaultStyles from '../config/style';

interface Props {
  [propName: string]: any;
}

interface Sneakers {
  sku?: string;
  brand?: string;
  name?: string;
  colorway?: string;
  gender?: string;
  silhouette?: string;
  retailPrice?: number;
  releaseDate?: string;
  releaseYear?: number;
  estimatedMarketValue?: number;
  links?: string;
  imgUrl?: string;
  story?: string;
}

const SneakerDetailsScreen: FC<Props> = ({route}) => {
  const sneaker: Sneakers = route.params;

  const handleAddToTopTenPressed = () => {
    usersApi.addSneakerToTopTen(sneaker);
  };

  const handleAddToClosetPressed = () => {
    console.log('Add to Closet');
  };

  const handleAddToWishListPressed = () => {
    console.log('Add to Wish List');
  };

  const handleAddToFavoritesPressed = () => {
    console.log('Add to Favorites');
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={[styles.imageAndTitle, defaultStyles.shadows]}>
          {sneaker.imgUrl ? (
            <Image style={styles.image} source={{uri: sneaker.imgUrl}} />
          ) : (
            <Image
              style={styles.image}
              source={require('../assets/sneakers/snkr_placeholder.png')}
            />
          )}
          <AppText style={styles.title}>{sneaker.name}</AppText>
          <View style={styles.buttonContainer}>
            <AppButtonSmall
              style={styles.buttonsSmall}
              iconName="trophy"
              onPress={handleAddToTopTenPressed}
            />
            <AppButtonSmall
              style={styles.buttonsSmall}
              iconName="wardrobe"
              onPress={handleAddToClosetPressed}
            />
            <AppButtonSmall
              style={styles.buttonsSmall}
              iconName="playlist-plus"
              onPress={handleAddToWishListPressed}
            />
            <AppButtonSmall
              style={styles.buttonsSmall}
              iconName="heart"
              onPress={handleAddToFavoritesPressed}
            />
          </View>
        </View>
        <View style={[styles.details, defaultStyles.shadows]}>
          <AppText>
            <AppText style={styles.boldText}>Brand:</AppText> {sneaker.brand}
          </AppText>
          <AppText>
            <AppText style={styles.boldText}>Release Date:</AppText>{' '}
            {sneaker.releaseDate ? sneaker.releaseDate : 'Unknown'}
          </AppText>
          <AppText>
            <AppText style={styles.boldText}>Retail Price:</AppText>{' '}
            {sneaker.retailPrice ? '$' + sneaker.retailPrice : 'Unknown'}
          </AppText>
          <AppText>
            <AppText style={styles.boldText}>Estimated Market Value:</AppText>{' '}
            {sneaker.estimatedMarketValue
              ? '$' + sneaker.estimatedMarketValue
              : 'Unknown'}
          </AppText>
          <AppText>
            <AppText style={styles.boldText}>Style ID:</AppText> {sneaker.sku}
          </AppText>
          <AppText>
            <AppText style={styles.boldText}>Colorway:</AppText>{' '}
            {sneaker.colorway}
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  buttonsSmall: {
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  details: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  image: {
    width: 300,
    height: 214,
  },
  imageAndTitle: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default SneakerDetailsScreen;
