import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

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
      const { data } = await axios.get('http://localhost:5000/api/countries', config);
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
      await axios.delete(`http://localhost:5000/api/countries/${id}`, config);
      // Refetch countries to update the list
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
      await axios.delete('http://localhost:5000/api/countries', config);
      // Refetch countries to update the list
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
