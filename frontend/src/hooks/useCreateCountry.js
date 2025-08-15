import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

export const useCreateCountry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const createCountry = async (countryData) => {
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
        'http://localhost:5000/api/countries',
        countryData,
        config
      );
      toast.success('¡País creado con éxito!');
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      toast.error(err.response.data.message);
      return null;
    }
  };

  return { createCountry, isLoading, error };
};
