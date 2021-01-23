import React, {FC} from 'react';
import {View, StyleSheet, Image, Pressable, Text} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import defaultStyles from '../config/style';

interface Media {
  imageUrl?: string;
  smallImageUrl?: string;
  thumbUrl?: string;
}

interface Sneakers {
  brand?: string;
  colorway?: string;
  gender?: string;
  id?: string;
  media?: Media;
  name?: string;
  releaseDate?: number;
  retailPrice?: string;
  shoe?: string;
  styleId?: string;
  title?: string;
  year?: number;
}

const ListItem: FC<Sneakers> = ({media, shoe, name}) => {
  return (
    <Pressable style={[styles.container, defaultStyles.shadows]}>
      <Image style={styles.image} source={{uri: media.thumbUrl}} />
      <View style={styles.details}>
        <AppText numberOfLines={1}>{shoe}</AppText>
        <AppText numberOfLines={1}>{name}</AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
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
