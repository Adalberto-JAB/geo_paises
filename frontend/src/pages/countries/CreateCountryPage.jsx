import { useState, useEffect, useMemo } from 'react';
import { useCreateCountry } from '../../hooks/useCreateCountry';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchAllCountries } from '../../services/countriesAllAPI';
import CountryList from '../../components/CountryList';

const AddCountryFromAPIPage = () => {
  const { createCountry, isLoading: isCreating } = useCreateCountry();
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      setApiLoading(true);
      try {
        const mergedData = await fetchAllCountries();
        setAllCountries(mergedData);
      } catch (err) {
        toast.error(err.message);
        setAllCountries([]);
      }
      setApiLoading(false);
    };
    loadCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return allCountries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCountries, searchTerm]);

  const handleSelectApiCountry = async (country) => {
    const countryData = {
        name: country.name,
        independent: country.independent,
        unMember: country.unMember,
        currencies: country.currencies,
        capital: country.capital,
        region: country.region,
        subregion: country.subregion,
        languages: country.languages,
        latlng: country.latlng,
        landlocked: country.landlocked,
        borders: country.borders,
        area: country.area,
        population: country.population,
        gini: country.gini,
        timezones: country.timezones,
        continents: country.continents,
        flags: country.flags,
        capitalInfo: country.capitalInfo,
      };
    const success = await createCountry(countryData);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Agregar Países Dese La API</h1>
      <div className="bg-card p-8 rounded-lg shadow-md">
        <CountryList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          apiLoading={apiLoading}
          filteredCountries={filteredCountries}
          handleSelectApiCountry={handleSelectApiCountry}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
};

export default AddCountryFromAPIPage;