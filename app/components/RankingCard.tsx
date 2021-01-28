import React, {FC} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import defaultStyles from '../config/style';

interface Props {
  ranking: number;
  imgUrl?: string;
  [propName: string]: any;
}

const RankingCard: FC<Props> = ({ranking, imgUrl}) => {
  return (
    <Pressable style={[styles.container, defaultStyles.shadows]}>
      <View style={[styles.ranking, defaultStyles.shadows]}>
        <AppText style={styles.number}>{ranking}</AppText>
      </View>
      {imgUrl ? (
        <Image style={styles.image} source={{uri: imgUrl}} />
      ) : (
        <Image
          style={styles.image}
          source={require('../assets/sneakers/snkr_placeholder.png')}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 10,
    margin: 5,
    backgroundColor: colors.background,
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 110,
    height: 90,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  ranking: {
    padding: 10,

    borderRadius: 50,
    backgroundColor: colors.ranking,
  },
});

export default RankingCard;
