import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/users/profile', config);
        setProfile(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put('http://localhost:5000/api/users/profile', userData, config);
      setProfile(response.data);
      localStorage.setItem('user', JSON.stringify(response.data)); // Update user in local storage
      toast.success('Profile updated successfully!');
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message);
      setIsLoading(false);
      return false;
    }
  };

  const deleteProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete('http://localhost:5000/api/users/profile', config);
      localStorage.removeItem('user'); // Remove user from local storage
      toast.success('¡Perfil eliminado con éxito!');
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message);
      setIsLoading(false);
      return false;
    }
  };

  return { profile, isLoading, error, updateProfile, deleteProfile };
};
