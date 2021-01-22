import logger from '../utility/logger';

const baseUrl = 'https://api.thesneakerdatabase.com/v1/';

interface Parameters {
  limit: number;
  page?: number;
  styleId?: number;
  name?: string;
  shoe?: string;
  brand?: string;
  gender?: string;
  colorway?: string;
  releaseDate?: string;
  releaseYear?: number;
  sort?: string;
}

const createUrlParameters = (params: Parameters) => {
  let result = `?limit=${params.limit}`;

  if (params.page) result += `&page=${params.page}`;
  if (params.styleId) result += `&styleId=${params.styleId}`;
  if (params.name) result += `&name=${params.name}`;
  if (params.shoe) result += `&shoe=${params.shoe}`;
  if (params.brand) result += `&brand=${params.brand}`;
  if (params.gender) result += `&gender=${params.gender}`;
  if (params.colorway) result += `&colorway=${params.colorway}`;
  if (params.releaseDate) result += `&releaseDate=${params.releaseDate}`;
  if (params.releaseYear) result += `&releaseYear=${params.releaseYear}`;
  if (params.sort) result += `&sort=${params.sort}`;

  return encodeURI(result);
};

const getBrands = async () => {
  try {
    const response = await fetch(`${baseUrl}brands`);
    const jsonResponse = await response.json();

    return jsonResponse.results;
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error getting the brands from the sneakers DB.',
    );
  }
};

const getGenders = async () => {
  try {
    const response = await fetch(`${baseUrl}genders`);
    const jsonResponse = await response.json();

    return jsonResponse.results;
  } catch (error) {
    logger.logErrorAndMessage(
      error,
      'Error getting the genders from the sneakers DB.',
    );
  }
};

const getSneakers = async (params: Parameters) => {
  try {
    const parameters = createUrlParameters(params);

    const response = await fetch(`${baseUrl}sneakers${parameters}`);
    const jsonResponse = await response.json();

    return jsonResponse.results;
  } catch (error) {
    logger.logErrorAndMessage(error, 'Error getting sneakers from API.');
  }
};

export default {
  getBrands,
  getGenders,
  getSneakers,
};
