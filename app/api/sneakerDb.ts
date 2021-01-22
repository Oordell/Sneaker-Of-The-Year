import logger from '../utility/logger';

const baseUrl = 'https://api.thesneakerdatabase.com/v1/';

interface Parameters {
  limit: number;
  page?: number;
  name?: string;
  shoe?: string;
  brand?: string;
  releaseYear?: number;
}

const createUrlParameters = (params: Parameters) => {
  let result = `?limit=${params.limit}`;

  if (params.page) result += `&page=${params.page}`;
  if (params.name) result += `&name=${params.name}`;
  if (params.shoe) result += `&shoe=${params.shoe}`;
  if (params.brand) result += `&brand=${params.brand}`;
  if (params.releaseYear) result += `&releaseYear=${params.releaseYear}`;

  return result.replace(' ', '%20');
};

const get10RandomSneakers = async () => {
  try {
    const response = await fetch(
      `${baseUrl}sneakers?limit=10&name=Yeezy%20350`,
    );

    const jsonResponse = await response.json();

    return jsonResponse.results;
  } catch (error) {
    console.log('Error in overall functionallity: ', error);
  }
};

const getSneakers = async (params: Parameters) => {
  try {
    const parameters = createUrlParameters(params);

    console.log('Parameters: ', parameters);

    const response = await fetch(`${baseUrl}sneakers${parameters}`);

    const jsonResponse = await response.json();

    return jsonResponse.results;
  } catch (error) {
    logger.logErrorAndMessage(error, 'Error getting sneakers from API.');
  }
};

export default {
  get10RandomSneakers,
  getSneakers,
};
