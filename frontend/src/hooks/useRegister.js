import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (name, email, password, profilePictureUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/users', { name, email, password, profilePictureUrl });
      const json = response.data;

      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      toast.success('¡Registro exitoso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return { register, isLoading, error };
};
