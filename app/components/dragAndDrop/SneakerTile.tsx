import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import colors from '../../config/colors';
import {WIDTH, HEIGHT, MARGIN} from './config';

interface Props {
  _id: string | number;
  imagePath: any;
  onLongPress: () => void;
}

const SneakerTile = ({imagePath}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={imagePath} style={[styles.container, styles.image]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: colors.primary,
  },
  image: {
    borderRadius: MARGIN,
    backgroundColor: colors.text_veryLight,
    resizeMode: 'contain',
  },
});

export default SneakerTile;
