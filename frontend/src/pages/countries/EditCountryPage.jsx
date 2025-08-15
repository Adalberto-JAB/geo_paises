import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCountryDetails } from '../../hooks/useCountryDetails';

const EditCountryPage = () => {
  const { id } = useParams();
  const { country, isLoading, error, updateCountry } = useCountryDetails(id);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (country) {
      setValue('name.official', country.name?.official || '');
      setValue('name.common', country.name?.common || '');
      setValue('capital.0', country.capital?.[0] || '');
      setValue('region', country.region || '');
      setValue('population', country.population || '');
      setValue('area', country.area || '');
      setValue('flags.png', country.flags?.png || '');
    }
  }, [country, setValue]);

  const onSubmit = async (data) => {
    const success = await updateCountry(data);
    if (success) {
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return <div className="text-center text-foreground">Loading country details...</div>;
  }

  if (error) {
    return <div className="text-center text-destructive">Error: {error}</div>;
  }

  if (!country) {
    return <div className="text-center text-foreground">Country not found.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-blue-500 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Modificar País</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Nombre oficial:</label>
          <input type="text" {...register('name.official', { required: true })} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
          {errors.name?.official && <span className="text-destructive text-xs">Este campo es obligatorio</span>}
        </div>
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Nombre común:</label>
          <input type="text" {...register('name.common', { required: true })} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
          {errors.name?.common && <span className="text-destructive text-xs">Este campo es obligatorio</span>}
        </div>
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Capital:</label>
          <input type="text" {...register('capital.0')} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
        </div>
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Continente:</label>
          <input type="text" {...register('region', { required: true })} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
          {errors.region && <span className="text-destructive text-xs">Este campo es obligatorio</span>}
        </div>
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Población:</label>
          <input type="number" {...register('population')} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
        </div>
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Superficie (km²):</label>
          <input type="number" {...register('area')} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
        </div>
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Bnadera PNG URL:</label>
          <input type="text" {...register('flags.png')} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 disabled:bg-primary/50">
          {isLoading ? 'Actualizando...' : 'Actualizar País'}
        </button>
      </form>
    </div>
  );
};

export default EditCountryPage;