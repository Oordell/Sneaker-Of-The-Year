import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import usersApi from '../api/users';
import AppButton from '../components/buttons/AppButton';
import RankingCard from '../components/RankingCard';
import Screen from '../components/Screen';

interface TopTenSneaker {
  ranking: number;
  sneaker: any;
}

interface Props {}

const TopTenScreen: FC<Props> = () => {
  const [sneakers, setSneakers] = useState<TopTenSneaker[]>();

  useEffect(() => {
    getUsersTopTen();
  }, []);

  const getUsersTopTen = async () => {
    const topTenSneakers = await usersApi.getUsersTopTenSneakers();
    setSneakers(topTenSneakers);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        style={styles.list}
        data={sneakers}
        numColumns={2}
        keyExtractor={(sneaker) => sneaker.ranking.toString()}
        renderItem={({item}) => (
          <RankingCard ranking={item.ranking} imgUrl={item.sneaker.imgUrl} />
        )}
        ListFooterComponent={
          <>
            {!sneakers || sneakers.length < 10 ? (
              <AppButton title="add to top 10" iconName="plus" />
            ) : (
              <></>
            )}
          </>
        }
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
