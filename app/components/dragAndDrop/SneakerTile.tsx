import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import colors from '../../config/colors';
import {WIDTH, HEIGHT, MARGIN} from './config';

interface Props {
  id: string | number;
  imagePath: any;
  onLongPress: () => void;
}

const SneakerTile = ({imagePath}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={imagePath} style={[styles.image]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
  image: {
    borderRadius: MARGIN,
    margin: MARGIN * 2,
    backgroundColor: colors.text_veryLight,
    resizeMode: 'contain',
    flex: 1,
    width: WIDTH - 4 * MARGIN,
  },
});

export default SneakerTile;
