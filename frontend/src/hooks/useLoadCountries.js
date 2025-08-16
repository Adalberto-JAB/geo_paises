import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useLoadCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const loadCountries = async (filterType, filterValue) => {
    setIsLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        `${API_URL}/api/countries/load`,
        { filterType, filterValue },
        config
      );
      toast.success(response.data.message);
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      toast.error(err.response.data.message);
      return false;
    }
  };

  return { loadCountries, isLoading, error };
};
