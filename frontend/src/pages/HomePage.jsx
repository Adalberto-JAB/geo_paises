import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas, FaSearch, FaPlus, FaInfoCircle, FaSignInAlt } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';

const HomePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full dark:bg-blue-900/30 mb-6">
          <FaGlobeAmericas className="h-12 w-12 text-blue-600 dark:text-read-400" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Explora el Mundo
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-primry">
          Descubre información detallada sobre todos los países del mundo en un solo lugar.
        </p>
        {user ? (
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              <FaSearch className="mr-2" />
              Explorar Países
            </button>
            <button
              onClick={() => navigate('/add-country-api')}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              <FaPlus className="mr-2" />
              Agregar País
            </button>
          </div>
        ) : null}
      </div>

      {/* Features Section */}
      <div className="mt-6">
        <h2 className="text-3xl font-extrabold text-center text-primary sm:text-4xl">
          Características Principales
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FaGlobeAmericas className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
              title: 'Explora Países',
              description: 'Encuentra información detallada sobre cualquier país del mundo, incluyendo datos demográficos, geográficos y más.'
            },
            {
              icon: <FaSearch className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
              title: 'Búsqueda Avanzada',
              description: 'Filtra países por nombre, región o idioma para encontrar exactamente lo que estás buscando.'
            },
            {
              icon: <FaInfoCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
              title: 'Información Detallada',
              description: 'Accede a información detallada como capital, moneda, idiomas, fronteras y mucho más.'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full dark:bg-blue-900/30 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 bg-blue-900 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          ¿Listo para comenzar?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
          {user 
            ? 'Explora nuestra colección de países o agrega información sobre un nuevo país a nuestra base de datos.'
            : 'Inicia sesión para comenzar a explorar y administrar tu propia lista de países.'
          }
        </p>
        <div className="mt-6">
          {user ? (
            <button
              onClick={() => navigate('/paises')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-3 md:text-lg md:px-8 transition-colors duration-200"
            >
              Ver todos los países
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-3 md:text-lg md:px-8 transition-colors duration-200"
            >
              <FaSignInAlt className="mr-2" />
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
