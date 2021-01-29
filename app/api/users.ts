import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import logger from '../utility/logger';
import apiEndpoints from './endpoints';
import sneakersApi from './sneakers';

const dbRef = firestore().collection(apiEndpoints.USERS);

interface Sneaker {
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

interface TopTenSneaker {
  ranking: number;
  sneaker: Sneaker;
}

interface UserInfo {
  name?: string;
  email: string;
  isAdmin?: boolean;
  lastSignin?: Date;
  createdAt?: Date;
  numberOfSneakersInTopTen?: number;
  topTenSneakers?: TopTenSneaker;
}

const createNewOrUpdateUser = async (userInfo: UserInfo) => {
  try {
    const currentUser = firebaseAuth().currentUser;
    const targetDoc = dbRef.doc(currentUser.uid);

    const user = await targetDoc.get();
    if (user.exists) {
      // User already exists in DB.
      await targetDoc.update({
        last_signin: firestore.Timestamp.now(),
      });
      return;
    }

    // New user in DB:
    await targetDoc.set({
      name: userInfo.name
        ? userInfo.name
        : currentUser.displayName
        ? currentUser.displayName
        : '',
      email: userInfo.email,
      isAdmin: userInfo.isAdmin ? userInfo.isAdmin : false,
      lastSignin: firestore.Timestamp.now(),
      createdAt: firestore.Timestamp.now(),
      numberOfSneakersInTopTen: 0,
      topTenSneakers: [],
    });
  } catch (error) {
    logger.logErrorAndMessage(error, 'Error storing the user in Firestore.');
  }
};

const addSneakerToTopTen = async (sneaker: Sneaker, placement?: number) => {
  try {
    const currentUser = firebaseAuth().currentUser;
    const user = await dbRef.doc(currentUser.uid).get();

    if (!user.exists)
      return logger.logMessage(
        "Trying to get a user from firestore that doesn't exists",
      );

    if (user.data().numberOfSneakersInTopTen >= 10)
      return logger.logMessage(
        'Trying to add new sneakers to top ten, when there is already ten sneakers.',
      );

    let currentTopTen = user.data().topTenSneakers;
    for (let rankedSneaker of currentTopTen) {
      let snkr = await rankedSneaker.sneaker.get();
      if (snkr.data().sku === sneaker.sku) {
        return logger.logMessage(
          'Trying to add a sneaker to top ten, but the sneaker is already on the users top ten.',
        );
      }
    }

    if (placement) {
      if (placement < 1 || placement > 10)
        return logger.logMessage(
          'Given placemnet is out of reange for top ten.',
        );

      // Move all sneakers lower than "placement" one spot down in the list
      for (let i = 0; i < currentTopTen.length; i++) {
        if (currentTopTen[i].ranking >= placement) {
          currentTopTen[i].ranking += 1;
        }
      }
    }

    const placementOnTopTen = placement
      ? placement
      : user.data().numberOfSneakersInTopTen + 1;

    // Add the sneaker to the DB:
    await sneakersApi.addOrUpdateSneaker(sneaker, placementOnTopTen);

    // Get the sneaker to create a reference.
    const sneakerRef = await sneakersApi.getSneaker(sneaker);

    // Create a Ranked sneaker object
    const newSneaker = {
      ranking: placementOnTopTen,
      sneaker: sneakerRef[0].ref,
    };

    // Update the users info:
    const increment = firestore.FieldValue.increment(1);
    await dbRef.doc(currentUser.uid).update({
      numberOfSneakersInTopTen: increment,
      topTenSneakers: [...currentTopTen, newSneaker],
    });
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error adding a sneaker to the users top ten in Firestore.',
    );
  }
};

const getUsersTopTenSneakers = async () => {
  try {
    const currentUser = firebaseAuth().currentUser;
    const user = await dbRef.doc(currentUser.uid).get();

    let sneakers = [];
    for (let sneakerRanking of user.data().topTenSneakers) {
      sneakers.push({
        ranking: sneakerRanking.ranking,
        sneaker: await sneakerRanking.sneaker.get(),
      });
    }

    return sneakers;
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error getting the users top ten sneakers from Firestore.',
    );
  }
};

const deleteSneakerFromUsersTopTen = async (sneakerRanking: TopTenSneaker) => {
  try {
    const currentUser = firebaseAuth().currentUser;
    const user = await dbRef.doc(currentUser.uid).get();

    let newTopTenSneakers = user
      .data()
      .topTenSneakers.filter(
        (rankedSneaker: TopTenSneaker) =>
          rankedSneaker.ranking != sneakerRanking.ranking,
      );
    newTopTenSneakers.forEach((element: TopTenSneaker) => {
      if (element.ranking > sneakerRanking.ranking) element.ranking -= 1;
    });

    const decrement = firestore.FieldValue.increment(-1);
    await dbRef.doc(currentUser.uid).update({
      numberOfSneakersInTopTen: decrement,
      topTenSneakers: newTopTenSneakers,
    });

    await sneakersApi.updateRatingOfSneaker(
      sneakerRanking.sneaker.data(),
      sneakerRanking.ranking,
    );
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error trying to remove a sneaker from the users top ten in Firestore.',
    );
  }
};

export default {
  createNewOrUpdateUser,
  addSneakerToTopTen,
  getUsersTopTenSneakers,
  deleteSneakerFromUsersTopTen,
};
