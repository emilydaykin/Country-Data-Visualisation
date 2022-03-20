import axios from 'axios';

const baseURL = 'https://api.api-ninjas.com/v1/country?';

export const countryAPI = async (country) => {
  console.log(`Fetching data for ${country}...`);
  const res = await axios({
    method: 'get',
    url: `${baseURL}name=${country}`,
    headers: { 'X-Api-Key': process.env.REACT_APP_API_KEY }
  });
  return res;
};
