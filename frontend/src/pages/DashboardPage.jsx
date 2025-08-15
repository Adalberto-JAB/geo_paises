import { useState, useMemo } from 'react';
import { useCountries } from '../hooks/useCountries';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const { data, isLoading, error, deleteCountry, deleteAllCountries } = useCountries(currentPage, countriesPerPage);
  const navigate = useNavigate();

  const { countries, pages: totalPages } = data;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCountriesPerPageChange = (e) => {
    setCountriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Estas seguro/a?',
      text: "No podrás revertir el proceso!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar este país!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCountry(id);
      }
    });
  };

  const handleClearAllCountries = () => {
    Swal.fire({
      title: 'Estas seguro/a?',
      text: "Esto eliminará todos los países guardados!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Borrar Todo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAllCountries();
      }
    });
  };

  // Nota: Esta implementación calcula los totales de los países visibles en la página actual.
  const totals = useMemo(() => {
    if (!countries) return { totalPopulation: 0, totalArea: 0, averageGini: 0 };
    const totalPopulation = countries.reduce((acc, country) => acc + (country.population || 0), 0);
    const totalArea = countries.reduce((acc, country) => acc + (country.area || 0), 0);
    const giniValues = countries.map(country => country.gini ? Object.values(country.gini)[0] : 0).filter(g => g > 0);
    const averageGini = giniValues.length > 0 ? giniValues.reduce((acc, gini) => acc + gini, 0) / giniValues.length : 0;
    return { totalPopulation, totalArea, averageGini };
  }, [countries]);

  if (isLoading) {
    return <div className="text-center">Cargando Países...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Tus Países Guardados</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <button onClick={() => navigate('/add-manual-country')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
            <FaPlus className="mr-2" /> Agrega Tu País
          </button>
          <button onClick={() => navigate('/add-country-api')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
            <FaPlus className="mr-2" /> Agregar País desde API
          </button>
          <button onClick={() => navigate('/load-countries')} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
            <FaDownload className="mr-2" /> Cargando desde la API
          </button>
        </div>
        {countries && countries.length > 0 && (
          <button
            onClick={handleClearAllCountries}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-4 md:mt-0 w-full md:w-auto justify-center"
          >
            <FaTrash className="mr-2" /> Borrar Todo
          </button>
        )}
      </div>

      {/* Page size selector */}
      <div className="flex justify-end mb-4">
        <label htmlFor="countries-per-page" className="mr-2">Países por página:</label>
        <select id="countries-per-page" value={countriesPerPage} onChange={handleCountriesPerPageChange} className="bg-gray-700 text-white border rounded p-1">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {!countries || countries.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          <p>Aún no has guardado ningún país.</p>
          <p>Comience agregando un nuevo país o cargando desde la API!</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Bandera</th>
                  <th className="py-3 px-4 text-left">País</th>
                  <th className="py-3 px-4 text-left">Capital</th>
                  <th className="py-3 px-4 text-left">Continente</th>
                  <th className="py-3 px-4 text-left">Población</th>
                  <th className="py-3 px-4 text-left">Superficie (km²)</th>
                  <th className="py-3 px-4 text-left">Índice Gini</th>
                  <th className="py-3 px-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country) => (
                  <tr key={country._id} className="border-b border-gray-200 hover:bg-gray-600 bg-gray-700 text-green-400">
                    <td className="py-3 px-4">
                      <img src={country.flags?.png} alt={`${country.name?.common} flag`} className="w-10 h-auto" />
                    </td>
                    <td className="py-3 px-4">
                      <span onClick={() => navigate(`/country/${country._id}`)} className="text-cyan-400  hover:underline cursor-pointer">
                        {country.name?.common}
                      </span>
                    </td>
                    <td className="py-3 px-4">{country.capital?.join(', ') || 'N/A'}</td>
                    <td className="py-3 px-4">{country.continents?.join(', ') || 'N/A'}</td>
                    <td className="py-3 px-4">{country.population?.toLocaleString() || 'N/A'}</td>
                    <td className="py-3 px-4">{country.area?.toLocaleString() || 'N/A'}</td>
                    <td className="py-3 px-4">
                      {country.gini ? Object.values(country.gini)[0] : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <div className='flex justify-center space-x-4'>
                      <button onClick={() => navigate(`/edit-country/${country._id}`)} className="text-blue-200 hover:text-blue-300 cursor-pointer">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(country._id)} className="text-pink-500 hover:text-pink-600 cursor-pointer">
                        <FaTrash />
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-800 text-white font-bold">
                  <td className="py-3 px-4" colSpan="4">Totales de esta página</td>
                  <td className="py-3 px-4">{totals.totalPopulation.toLocaleString()}</td>
                  <td className="py-3 px-4">{totals.totalArea.toLocaleString()}</td>
                  <td className="py-3 px-4">{totals.averageGini.toFixed(2)}</td>
                  <td className="py-3 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => handlePageChange(number + 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'}`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;