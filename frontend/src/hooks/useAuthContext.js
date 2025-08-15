import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuthContext debe ser usado dentro de un AuthContextProvider');
  }

  return context;
};
