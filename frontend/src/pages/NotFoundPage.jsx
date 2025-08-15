import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-14bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <svg 
              className="w-10 h-10 text-red-600 dark:text-red-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Página no encontrada
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Lo sentimos, no pudimos encontrar la página que estás buscando. 
            Es posible que la dirección URL sea incorrecta o que la página se haya movido.
          </p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Volver
            </button>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              ¿Necesitas ayuda?{' '}
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // Aquí se podría abrir un modal de contacto o redirigir a una página de soporte
                  alert('Por favor, contacta al soporte técnico para obtener ayuda.');
                }}
              >
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
