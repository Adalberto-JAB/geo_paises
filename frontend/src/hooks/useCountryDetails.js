import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

export const useCountryDetails = (id) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCountry = async () => {
      if (!user || !id) {
        setIsLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/countries/${id}`, config);
        setCountry(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [id, user]);

  const updateCountry = async (countryData) => {
    setIsLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(`http://localhost:5000/api/countries/${id}`, countryData, config);
      setCountry(response.data);
      toast.success('¡País actualizado con éxito!');
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message);
      setIsLoading(false);
      return false;
    }
  };

  return { country, isLoading, error, updateCountry };
};
