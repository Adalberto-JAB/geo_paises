import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Iniciar Sesión</h2>
        
        <div className="mb-4">
          <label className="block text-card-foreground">Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-card-foreground">Contraseña</label>
          <input 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 disabled:bg-primary/50">
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        {error && <p className="text-destructive text-center mt-4">{error}</p>}

        <p className="text-center mt-4 text-card-foreground">
          ¿No tienes una cuenta? <span onClick={() => navigate('/register')} className="text-primary hover:underline cursor-pointer">Regístrate</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
