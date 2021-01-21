const baseUrl = 'https://api.thesneakerdatabase.com/v1/';

const get10RandomSneakers = async () => {
  try {
    const response = await fetch(`${baseUrl}sneakers?limit=10`, {
      method: 'GET',
    });

    const jsonResponse = await response.json();
    let result = jsonResponse.results;
    result.forEach(async (a) => {
      try {
        a.media = await a.media.json();
      } catch (error) {
        console.log('Error: ', error);
      }
    });

    console.log(result);
  } catch (error) {
    console.log('Error: ', error);
  }
};

export default {
  get10RandomSneakers,
};
