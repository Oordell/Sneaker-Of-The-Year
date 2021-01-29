import React, {FC} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import defaultStyles from '../config/style';
import {Icon} from 'react-native-elements';

interface Props {
  ranking: number;
  imgUrl?: string;
  [propName: string]: any;
}

const RankingCard: FC<Props> = ({ranking, imgUrl, onDeletePressed}) => {
  return (
    <Pressable style={[styles.container, defaultStyles.shadows]}>
      <View style={[styles.ranking, defaultStyles.shadows]}>
        <AppText style={styles.number}>{ranking}</AppText>
      </View>

      <Image
        style={styles.image}
        source={
          imgUrl
            ? {uri: imgUrl}
            : require('../assets/sneakers/snkr_placeholder.png')
        }
      />

      <Pressable style={styles.deleteButton} onPress={onDeletePressed}>
        <Icon
          name="delete"
          size={30}
          color={colors.text}
          type="material-community"
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 5,
    margin: 5,
    backgroundColor: colors.background,
    flexDirection: 'row',
    flex: 1,
  },
  deleteButton: {
    right: 5,
    top: 5,
    position: 'absolute',
  },
  image: {
    width: 120,
    height: 80,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ranking: {
    padding: 10,

    borderRadius: 50,
    backgroundColor: colors.ranking,
  },
});

export default RankingCard;
