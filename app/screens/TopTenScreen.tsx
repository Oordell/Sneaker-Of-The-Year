import React, {FC, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import usersApi from '../api/users';
import AppText from '../components/AppText';
import AppButton from '../components/buttons/AppButton';
import RankingCard from '../components/RankingCard';
import Screen from '../components/Screen';
import {useIsFocused} from '@react-navigation/native';

interface TopTenSneaker {
  ranking: number;
  sneaker: any;
}

interface Props {}

const TopTenScreen: FC<Props> = () => {
  const [sneakers, setSneakers] = useState<TopTenSneaker[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getUsersTopTen();
  }, [isFocused]);

  const getUsersTopTen = async () => {
    const topTenSneakers = await usersApi.getUsersTopTenSneakers();
    setSneakers(topTenSneakers);
  };

  const handleDeletePressed = async (sneaker: TopTenSneaker) => {
    await usersApi.deleteSneakerFromUsersTopTen(sneaker);
    refreshList();
  };

  const refreshList = async () => {
    setRefreshing(true);
    await getUsersTopTen();
    setRefreshing(false);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        style={styles.list}
        data={sneakers}
        numColumns={2}
        keyExtractor={(sneaker) => sneaker.ranking.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshList} />
        }
        renderItem={({item}) => (
          <RankingCard
            ranking={item.ranking}
            imgUrl={item.sneaker.data().imgUrl}
            onDeletePressed={() => handleDeletePressed(item)}
          />
        )}
        ListHeaderComponent={
          <AppText style={styles.heading}>
            My top ten sneakers of the year
          </AppText>
        }
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
  heading: {
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default TopTenScreen;
