import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import RankingCard from '../components/RankingCard';
import Screen from '../components/Screen';

interface Props {}

const TopTenScreen: FC<Props> = () => {
  const data = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
  ];

  return (
    <Screen style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        numColumns={2}
        keyExtractor={(sneaker) => sneaker.id.toString()}
        renderItem={({item}) => <RankingCard ranking={item.id} />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default TopTenScreen;
