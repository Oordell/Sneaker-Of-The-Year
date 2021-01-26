import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/buttons/AppButton';
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
        <AppText>
          <AppText style={styles.boldText}>Brand:</AppText> {sneaker.brand}
        </AppText>
        <AppText>
          <AppText style={styles.boldText}>Release Date:</AppText>{' '}
          {sneaker.releaseDate}
        </AppText>
        <AppText>
          <AppText style={styles.boldText}>Retail Price:</AppText>{' '}
          {sneaker.retailPrice}
        </AppText>
        <AppText>
          <AppText style={styles.boldText}>Style ID:</AppText> {sneaker.styleId}
        </AppText>
        <AppText>
          <AppText style={styles.boldText}>Colorway:</AppText>{' '}
          {sneaker.colorway}
        </AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Add to top 10"
          iconName="plus"
          onPress={() => console.log('Added pressed')}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: 20,
    bottom: 20,
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
