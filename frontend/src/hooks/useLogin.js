import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
      const json = response.data;

      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      toast.success('¡Inicio de sesión exitoso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return { login, isLoading, error };
};
