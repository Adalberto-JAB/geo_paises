import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

// La URL base de la API se obtiene de las variables de entorno de Vite.
// Si no está definida, se usa la URL local como respaldo.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useCountries = (page = 1, limit = 10) => {
  const [data, setData] = useState({ countries: [], page: 1, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const fetchCountries = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { page, limit },
      };
      // Se usa la URL base para construir la ruta completa
      const { data } = await axios.get(`${API_URL}/api/countries`, config);
      setData(data);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [user, page, limit]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const deleteCountry = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // Se usa la URL base para construir la ruta completa
      await axios.delete(`${API_URL}/api/countries/${id}`, config);
      fetchCountries(); 
      toast.success('Country deleted successfully!');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
      return false;
    }
  };

  const deleteAllCountries = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // Se usa la URL base para construir la ruta completa
      await axios.delete(`${API_URL}/api/countries`, config);
      fetchCountries(); 
      toast.success('¡Todos los países eliminados con éxito!');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
      return false;
    }
  };

  return { data, isLoading, error, deleteCountry, deleteAllCountries, refetch: fetchCountries };
};