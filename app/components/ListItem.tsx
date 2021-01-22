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

const ListItem: FC<Sneakers> = ({media, title, releaseDate}) => {
  return (
    <Pressable style={styles.container}>
      <View style={[styles.card, defaultStyles.shadows]}>
        <Image style={styles.image} source={{uri: media.thumbUrl}} />
        <View style={styles.details}>
          <AppText numberOfLines={3}>{title}</AppText>
          <AppText numberOfLines={1}>Release: {releaseDate}</AppText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  details: {
    flex: 1,
  },
  image: {
    marginRight: 10,
    width: 140,
    height: 100,
  },
  textBrand: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default ListItem;
