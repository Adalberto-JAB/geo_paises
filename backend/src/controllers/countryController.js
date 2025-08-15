import asyncHandler from 'express-async-handler';
import Country from '../models/CountryModel.js';
import axios from 'axios';

// @desc    Fetch all countries for a user with pagination
// @route   GET /api/countries
// @access  Private
const getCountries = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10; // Cantidad de países por página
  const page = Number(req.query.page) || 1; // Página actual

  const count = await Country.countDocuments({ creador: req.user._id });
  const countries = await Country.find({ creador: req.user._id })
    .sort({ 'name.common': 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ countries, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single country
// @route   GET /api/countries/:id
// @access  Private
const getCountryById = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (country && country.creador.toString() === req.user._id.toString()) {
    res.json(country);
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});

// @desc    Create a country
// @route   POST /api/countries
// @access  Private
const createCountry = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Verificación manual para evitar duplicados
  const existingCountry = await Country.findOne({ 
    'name.official': name.official, 
    creador: req.user._id 
  });

  if (existingCountry) {
    res.status(400);
    throw new Error('El país ya existe en tu lista.');
  }

  const countryData = { ...req.body, creador: req.user._id };

  try {
    const createdCountry = await Country.create(countryData);
    res.status(201).json(createdCountry);
  } catch (error) {
    // Aunque hemos añadido una verificación manual, mantenemos el control de errores por si acaso
    if (error.code === 11000) {
      res.status(400);
      throw new Error('El país ya existe en tu lista.');
    } else {
      res.status(500);
      throw new Error('Error al crear el país.');
    }
  }
});

// @desc    Update a country
// @route   PUT /api/countries/:id
// @access  Private
const updateCountry = asyncHandler(async (req, res) => {
  const { name, capital, region, population, area, flags } = req.body;

  const country = await Country.findById(req.params.id);

  if (country && country.creador.toString() === req.user._id.toString()) {
    country.name = name || country.name;
    country.capital = capital || country.capital;
    country.region = region || country.region;
    country.population = population || country.population;
    country.area = area || country.area;
    country.flags = flags || country.flags;

    const updatedCountry = await country.save();
    res.json(updatedCountry);
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});

// @desc    Delete a country
// @route   DELETE /api/countries/:id
// @access  Private
const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (country && country.creador.toString() === req.user._id.toString()) {
    await country.deleteOne();
    res.json({ message: 'Country removed' });
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});

// @desc    Delete all countries for a user
// @route   DELETE /api/countries
// @access  Private
const deleteAllCountries = asyncHandler(async (req, res) => {
    await Country.deleteMany({ creador: req.user._id });
    res.json({ message: 'All countries removed for the user' });
});


// @desc    Load countries from external API and save them
// @route   POST /api/countries/load
// @access  Private
const loadCountriesFromAPI = asyncHandler(async (req, res) => {
    // console.log('--- Starting loadCountriesFromAPI ---');
    const { filterType, filterValue } = req.body;
    // console.log(`Filter Type: ${filterType}, Filter Value: ${filterValue}`);

    const fieldsPart1 = 'name,independent,unMember,currencies,capital,region,subregion,languages,latlng'; // Minimal fields for filtering
    const fieldsPart2 = 'name,landlocked,borders,area,population,gini,timezones,continents,flags,capitalInfo'; // Remaining fields for saving

    try {
      console.log('Fetching data from external API with split fields...');
      const [response1, response2] = await Promise.all([
        axios.get(`https://restcountries.com/v3.1/all?fields=${fieldsPart1}`),
        axios.get(`https://restcountries.com/v3.1/all?fields=${fieldsPart2}`),
      ]);
      console.log('External API data fetched successfully.');

      const data1 = response1.data;
      const data2 = response2.data;

      // Merge data based on a unique identifier, e.g., official name
      const allApiCountries = data1.map(country1 => {
        const country2 = data2.find(c2 => c2.name.official === country1.name.official);
        return { ...country1, ...country2 };
      });
      // console.log(`Total countries from API after merge: ${allApiCountries.length}`);

      const userCountries = await Country.find({ creador: req.user._id }).select('name.official');
      const userCountryNames = userCountries.map(c => c.name.official);
      // console.log(`User already has ${userCountryNames.length} countries.`);

      let filteredData = allApiCountries;

      if (filterType && filterValue) {
          switch (filterType) {
              case 'continent':
                  filteredData = allApiCountries.filter(c => c.continents && c.continents.includes(filterValue));
                  break;
              case 'language':
                  filteredData = allApiCountries.filter(c => c.languages && Object.values(c.languages).includes(filterValue));
                  break;
              case 'timezone':
                  filteredData = allApiCountries.filter(c => c.timezones && c.timezones.includes(filterValue));
                  break;
          }
      }
      // console.log(`Countries after filtering: ${filteredData.length}`);

      const countriesToSave = filteredData.filter(apiCountry => !userCountryNames.includes(apiCountry.name.official)).map(apiCountry => ({
          name: apiCountry.name,
          independent: apiCountry.independent,
          unMember: apiCountry.unMember,
          currencies: apiCountry.currencies,
          capital: apiCountry.capital,
          region: apiCountry.region,
          subregion: apiCountry.subregion,
          languages: apiCountry.languages,
          latlng: apiCountry.latlng,
          landlocked: apiCountry.landlocked,
          borders: apiCountry.borders,
          area: apiCountry.area,
          population: apiCountry.population,
          gini: apiCountry.gini,
          timezones: apiCountry.timezones,
          continents: apiCountry.continents,
          flags: apiCountry.flags,
          capitalInfo: apiCountry.capitalInfo,
          creador: req.user._id,
      }));
      // console.log(`Countries to save to DB: ${countriesToSave.length}`);

      if (countriesToSave.length > 0) {
          try {
              await Country.insertMany(countriesToSave);
              console.log('Countries saved to DB successfully.');
          } catch (dbError) {
              console.error('Error saving countries to DB:', dbError);
              res.status(500);
              throw new Error('Error saving countries to database.');
          }
      }

      res.status(201).json({ message: `${countriesToSave.length} countries loaded successfully.` });
    } catch (apiError) {
      console.error('Error in loadCountriesFromAPI (external API call or merge):', apiError);
      res.status(500);
      throw new Error('Error processing country data from external API.');
    }
});

export {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  deleteAllCountries,
  loadCountriesFromAPI,
};