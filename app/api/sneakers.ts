import firestore from '@react-native-firebase/firestore';
import logger from '../utility/logger';
import apiEndpoints from './endpoints';

const dbRef = firestore().collection(apiEndpoints.SNEAKERS);

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
  numOfPlacementsOnTopTens?: number;
  rankingTotal?: number;
}

const getSneaker = async (sneaker: Sneaker) => {
  try {
    const result = await dbRef
      .where('sku', '==', sneaker.sku)
      .where('estimatedMarketValue', '==', sneaker.estimatedMarketValue)
      .where('name', '==', sneaker.name)
      .get();

    let sneakersInDb = [];
    result.forEach((doc) => {
      sneakersInDb.push(doc);
    });

    return sneakersInDb;
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      `Error trying to get the sneaker from Firestore DB.`,
    );
  }
};

const addOrUpdateSneaker = async (
  sneaker: Sneaker,
  placmentOnTopTen: number,
) => {
  const ranking = placmentOnTopTen * -1 + 11;

  try {
    const sneakersInDb = await getSneaker(sneaker);

    if (sneakersInDb.length > 1) {
      // There is more than one match in the db, which means that I should
      // increase the search criteria for getting the sneaker.
      return logger.logMessage(
        'There is more than one match of sneakers in the DB.',
      );
    } else if (sneakersInDb.length === 1) {
      // There is one (1) matching sneaker in the db, that now gets updated:
      const incrementCounter = firestore.FieldValue.increment(1);
      const incrementRanking = firestore.FieldValue.increment(ranking);

      await sneakersInDb[0].ref.update({
        numOfPlacementsOnTopTens: incrementCounter,
        rankingTotal: incrementRanking,
      });
    } else {
      // There is no matching sneaker in the DB. A new one is added now.
      await dbRef.add({
        ...sneaker,
        numOfPlacementsOnTopTens: 1,
        rankingTotal: ranking,
      });
    }
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      `Error adding or updating sneaker in Firestore DB`,
    );
  }
};

const updateRatingOfSneaker = async (
  sneaker: Sneaker,
  oldPlacementOnTopTen: number,
  newPlacementOnTopTen: number = 0,
) => {
  const oldRanking = oldPlacementOnTopTen * -1 + 11;
  const newRanking =
    newPlacementOnTopTen < 1 ? 0 : newPlacementOnTopTen * -1 + 11;
  try {
    const sneakersInDb = await getSneaker(sneaker);

    if (sneakersInDb.length < 1)
      return logger.logMessage("Couldn't find sneaker in Firestore DB.");

    const decrement = firestore.FieldValue.increment(-1);
    const sneakerDoc = await sneakersInDb[0].get();
    sneakersInDb[0].ref.update({
      numOfPlacementsOnTopTens:
        newRanking === 0 ? sneakerDoc.numOfPlacementsOnTopTens : decrement,
      rankingTotal: sneakerDoc.rankingTotal + newRanking - oldRanking,
    });
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      `Error updating the sneakers rating in Firestore DB`,
    );
  }
};

export default {
  addOrUpdateSneaker,
  updateRatingOfSneaker,
};
