import axios from 'axios';

export const fetchAllCountries = async () => {
  try {
    const fieldsPart1 = 'name,independent,unMember,currencies,capital,region,subregion,languages,latlng';
    const fieldsPart2 = 'name,landlocked,borders,area,population,gini,timezones,continents,flags,capitalInfo';

    const [response1, response2] = await Promise.all([
      axios.get(`https://restcountries.com/v3.1/all?fields=${fieldsPart1}`),
      axios.get(`https://restcountries.com/v3.1/all?fields=${fieldsPart2}`),
    ]);

    const data1 = response1.data;
    const data2 = response2.data;

    const mergedData = data1.map(country1 => {
      const country2 = data2.find(c2 => c2.name.official === country1.name.official);
      return { ...country1, ...country2 };
    });

    return mergedData;
  } catch (err) {
    console.error('Error al obtener países de la API:', err);
    throw new Error('Error al obtener países de la API.');
  }
};