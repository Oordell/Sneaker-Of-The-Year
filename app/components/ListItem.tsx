import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import defaultStyles from '../config/style';

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

interface Props {
  sneaker: Sneakers;
  onPress?: (event: GestureResponderEvent) => void;
}

const ListItem: FC<Props> = ({sneaker: {imgUrl, brand, name}, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.7 : 1.0},
        styles.container,
        defaultStyles.shadows,
      ]}
      onPress={onPress}>
      {imgUrl ? (
        <Image style={styles.image} source={{uri: imgUrl}} />
      ) : (
        <Image
          style={styles.image}
          source={require('../assets/sneakers/snkr_placeholder.png')}
        />
      )}
      <View style={styles.details}>
        <AppText numberOfLines={1}>{name}</AppText>
        <AppText numberOfLines={1}>{brand}</AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    flex: 1,
  },
  details: {
    alignItems: 'flex-start',
  },
  image: {
    width: 140,
    height: 100,
    alignSelf: 'center',
  },
  textBrand: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default ListItem;
