import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { generateRandomAvatars, generateDiceBearAvatar } from '../../utils/avatarUtils';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { register: signup, isLoading, error } = useRegister();
  const navigate = useNavigate();
  const password = watch('password');

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    const generated = generateRandomAvatars();
    setAvatars(generated);
    setSelectedAvatar(generated[0]); // Select the first generated avatar by default
  }, []);

  const handleGenerateNewAvatars = () => {
    setAvatars(generateRandomAvatars());
  };

  const handleSelectDefaultAvatar = () => {
    // Use a generic seed for a consistent default avatar
    setSelectedAvatar(generateDiceBearAvatar('default-user'));
  };

  const onSubmit = async (data) => {
    await signup(data.name, data.email, data.password, selectedAvatar);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Crear Cuenta</h2>

        <div className="mb-4">
          <label className="block text-card-foreground">Nombre</label>
          <input 
            type="text" 
            {...register('name', { required: 'Name is required' })} 
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-card-foreground">Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-card-foreground">Contraseña</label>
          <input 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-card-foreground">Confirmar Contraseña</label>
          <input 
            type="password" 
            {...register('confirmPassword', { 
              required: 'Please confirm password', 
              validate: value => value === password || 'Passwords do not match' 
            })} 
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Avatar Selection Section */}
        <div className="mb-6">
          <label className="block text-card-foreground text-sm font-bold mb-2">Seleccionar Avatar:</label>
          <div className="flex items-center mb-4">
            <img src={selectedAvatar} alt="Selected Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-primary mr-4" />
            <button type="button" onClick={handleSelectDefaultAvatar} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold py-2 px-4 rounded cursor-pointer">
              Usar por Defecto
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {avatars.map((avatarUrl, index) => (
              <img
                key={index}
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                className={`w-16 h-16 rounded-full object-cover cursor-pointer ${selectedAvatar === avatarUrl ? 'border-4 border-primary' : ''}`}
                onClick={() => setSelectedAvatar(avatarUrl)}
              />
            ))}
          </div>
          <button type="button" onClick={handleGenerateNewAvatars} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded cursor-pointer">
            Generar Nuevos Avatares
          </button>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-primary font-bold text-primary-foreground py-2 rounded-md hover:bg-primary/90 disabled:bg-primary/50 cursor-pointer">
          {isLoading ? 'Creando cuenta...' : 'Registrarse'}
        </button>

        {error && <p className="text-destructive text-center mt-4">{error}</p>}

        <p className="text-center mt-4 text-card-foreground">
          ¿Ya tienes una cuenta? <span onClick={() => navigate('/login')} className="text-primary hover:underline cursor-pointer">Inicia Sesión</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;