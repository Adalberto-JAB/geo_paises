import { useForm } from 'react-hook-form';
import { useCreateCountry } from '../../hooks/useCreateCountry';
import { useNavigate } from 'react-router-dom';

const AddManualCountryPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createCountry, isLoading } = useCreateCountry();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await createCountry(data);
    if (success) {
      reset();
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Agregar un país manualmente</h1>
      <div className="bg-card p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Datos del País</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-card-foreground text-sm font-bold mb-2">Nombre Oficial:</label>
            <input type="text" {...register('name.official', { required: true })} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
            {errors.name?.official && <span className="text-destructive text-xs">Este campo es obligatorio</span>}
          </div>
          <div>
            <label className="block text-card-foreground text-sm font-bold mb-2">Nombre Nativo:</label>
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
            <label className="block text-card-foreground text-sm font-bold mb-2">URL de la Bandera:</label>
            <input type="text" {...register('flags.png')} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground" />
          </div>
          <div className="flex space-x-4">
            <button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 disabled:bg-primary/50">
              {isLoading ? 'Agregando...' : 'Agregar País'}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="w-full bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded hover:bg-secondary/80">
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddManualCountryPage;