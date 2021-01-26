import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';
import defaultStyles from '../config/style';

interface Props {
  [propName: string]: any;
}

const SneakerDetailsScreen: FC<Props> = ({route}) => {
  const sneaker = route.params;

  return (
    <Screen style={styles.container}>
      <View style={[styles.imageAndTitle, defaultStyles.shadows]}>
        <Image
          style={styles.image}
          source={{uri: sneaker.media.smallImageUrl}}
        />
        <AppText style={styles.title}>{sneaker.title}</AppText>
      </View>
      <View style={[styles.details, defaultStyles.shadows]}>
        <AppText>Brand: {sneaker.brand}</AppText>
        <AppText>Release Date: {sneaker.releaseDate}</AppText>
        <AppText>Retail Price: {sneaker.retailPrice}</AppText>
        <AppText>Style ID: {sneaker.styleId}</AppText>
        <AppText>Colorway: {sneaker.colorway}</AppText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
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
