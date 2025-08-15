import { useNavigate } from 'react-router-dom';

const CountryList = ({ searchTerm, setSearchTerm, apiLoading, filteredCountries, handleSelectApiCountry, isCreating }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          placeholder="Buscar país por su nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={() => navigate(-1)} className="bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded hover:bg-secondary/80">
          Volver
        </button>
      </div>
      {apiLoading ? (
        <div className="text-center text-foreground">Cargando todos los países...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto">
          {filteredCountries.map((country) => (
            <div key={country.name.official} className="border border-border p-4 rounded-lg flex flex-col justify-between">
              <img src={country.flags?.png} alt="flag" className="w-full h-24 object-cover mb-4" />
              <div className="flex-grow">
                <h3 className="font-bold text-lg mb-2 text-foreground">{country.name.common}</h3>
                <p className="text-sm text-muted-foreground"><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                <p className="text-sm text-muted-foreground"><strong>Población:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectApiCountry(country)}
                disabled={isCreating}
                className="mt-4 w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 disabled:bg-primary/50"
              >
                {isCreating ? 'Agregando...' : 'Agregar'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;
