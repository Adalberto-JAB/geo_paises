import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoadCountries } from '../../hooks/useLoadCountries';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoadCountriesPage = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const { loadCountries, isLoading, error } = useLoadCountries();
  const navigate = useNavigate();

  const filterType = watch('filterType');
  const [allCountriesData, setAllCountriesData] = useState([]);
  const [filterValueOptions, setFilterValueOptions] = useState([]);
  const [fetchingApiData, setFetchingApiData] = useState(false);

  useEffect(() => {
    const fetchAllCountries = async () => {
      setFetchingApiData(true);
      try {
        const fieldsPart1 = 'name,independent,unMember,currencies,capital,region,subregion,languages,latlng'; // Campos mínimos para filtrar
        const fieldsPart2 = 'name,landlocked,borders,area,population,gini,timezones,continents,flags,capitalInfo'; // Campos restantes para guardar

        const [response1, response2] = await Promise.all([
          axios.get(`https://restcountries.com/v3.1/all?fields=${fieldsPart1}`),
          axios.get(`https://restcountries.com/v3.1/all?fields=${fieldsPart2}`),
        ]);

        const data1 = response1.data;
        const data2 = response2.data;

        // Fusionar datos según un identificador único, el "nombre oficial"
        const mergedData = data1.map(country1 => {
          const country2 = data2.find(c2 => c2.name.official === country1.name.official);
          return { ...country1, ...country2 };
        });

        setAllCountriesData(mergedData);
      } catch (err) {
        console.error('Error al obtener todos los datos de los países desde la API externa:', err);
        toast.error('Error al obtener los datos de todos los países de la API externa. Inténtalo de nuevo.');
      }
      setFetchingApiData(false);
    };
    fetchAllCountries();
  }, []);

  useEffect(() => {
    setValue('filterValue', ''); // Restablecer el valor del filtro cuando cambia el tipo de filtroes
    if (filterType && allCountriesData.length > 0) {
      let options = new Set();
      allCountriesData.forEach(country => {
        if (filterType === 'continent' && country.continents) {
          country.continents.forEach(c => options.add(c));
        } else if (filterType === 'language' && country.languages) {
          Object.values(country.languages).forEach(l => options.add(l));
        } else if (filterType === 'timezone' && country.timezones) {
          country.timezones.forEach(t => options.add(t));
        }
      });
      setFilterValueOptions(Array.from(options).sort());
    } else {
      setFilterValueOptions([]);
    }
  }, [filterType, allCountriesData, setValue]);

  const onSubmit = async (data) => {
    const success = await loadCountries(data.filterType, data.filterValue);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Cargar países desde la API</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Tipo de filtro:</label>
          <select
            {...register('filterType', { required: 'El tipo de filtro es obligatorio' })}
            className="w-full px-3 py-2 mb-4 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          >
            <option value="">Seleccione un tipo de filtro</option>
            <option value="continent">Por Continente</option>
            <option value="language">Por Idioma</option>
            <option value="timezone">Por Uso Horario</option>
          </select>
          {errors.filterType && <p className="text-destructive text-xs italic">{errors.filterType.message}</p>}
        </div>

        {filterType && (
          <div>
            <label className="block text-card-foreground text-sm font-bold mb-2">Valor del filtro:</label>
            {fetchingApiData ? (
              <p className="text-foreground">Cargando opciones de filtro...</p>
            ) : (
              <select
                {...register('filterValue', { required: 'El valor del filtro es obligatorio' })}
                className="w-full px-3 py-2 mb-4 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
              >
                <option value="">Seleccione un valor</option>
                {filterValueOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {errors.filterValue && <p className="text-destructive text-xs italic">{errors.filterValue.message}</p>}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading || fetchingApiData}
            className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 disabled:bg-primary/50"
          >
            {isLoading ? 'Cargando...' : 'Cargar Países'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="w-full bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded hover:bg-secondary/80">
            Volver
          </button>
        </div>

        {error && <p className="text-destructive text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default LoadCountriesPage;