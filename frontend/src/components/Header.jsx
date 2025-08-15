import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTheme } from '../hooks/useTheme';
import { FaGlobeAmericas, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header = () => {
  const { user, dispatch } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-secondary text-secondary-foreground shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div onClick={() => handleNavigation('/')} className="text-xl font-bold flex items-center cursor-pointer">
          <FaGlobeAmericas className="mr-2 text-green-500" />
          GeoPaíses
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <div onClick={() => handleNavigation('/profile')} className="flex items-center hover:text-gray-300 cursor-pointer">
                <img src={user.profilePictureUrl || `https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                {user.name}
              </div>
              <div onClick={() => handleNavigation('/dashboard')} className="hover:text-gray-300 cursor-pointer">Panel de Control</div>
              <button onClick={handleLogout} className="flex items-center hover:text-gray-300">
                <FaSignOutAlt className="mr-1" />
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <div onClick={() => handleNavigation('/login')} className="flex items-center hover:text-gray-300 cursor-pointer">
                <FaSignInAlt className="mr-1" />
                Iniciar Sesión
              </div>
              <div onClick={() => handleNavigation('/register')} className="flex items-center hover:text-gray-300 cursor-pointer">
                <FaUserPlus className="mr-1" />
                Registrarse
              </div>
            </>
          )}
        </div>

        <div className="flex items-center">
          <button onClick={toggleTheme} className="focus:outline-none md:ml-6">
            {theme === 'light' ? (
              <FiMoon size={24} />
            ) : (
              <FiSun size={24} className="text-yellow-500" />
            )}
          </button>

          {/* Hamburger Icon */}
          <div className="md:hidden ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary text-secondary-foreground">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <div onClick={() => handleNavigation('/profile')} className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">
                  <img src={user.profilePictureUrl || `https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                  {user.name}
                </div>
                <div onClick={() => handleNavigation('/dashboard')} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">Panel de Control</div>
                <button onClick={handleLogout} className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                  <FaSignOutAlt className="mr-1" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <div onClick={() => handleNavigation('/login')} className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">
                  <FaSignInAlt className="mr-1" />
                  Iniciar Sesión
                </div>
                <div onClick={() => handleNavigation('/register')} className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">
                  <FaUserPlus className="mr-1" />
                  Registrarse
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
