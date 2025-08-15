import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProfile } from '../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { generateRandomAvatars, generateDiceBearAvatar } from '../../utils/avatarUtils';
import { useAuthContext } from '../../hooks/useAuthContext';

const EditProfilePage = () => {
  const { profile, isLoading, error, updateProfile, deleteProfile } = useProfile();
  const { dispatch } = useAuthContext();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name);
      setValue('email', profile.email);
      setSelectedAvatar(profile.profilePictureUrl);
      setAvatars(generateRandomAvatars());
    }
  }, [profile, setValue]);

  const onSubmit = async (data) => {
    const success = await updateProfile({ ...data, profilePictureUrl: selectedAvatar });
    if (success) {
      navigate('/profile');
    }
  };

  const handleDeleteAccount = () => {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
    const destructiveColor = getComputedStyle(document.documentElement).getPropertyValue('--color-destructive').trim();

    Swal.fire({
      title: 'Estas seguro/a?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: destructiveColor,
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteProfile();
        if (success) {
          dispatch({ type: 'LOGOUT' });
          navigate('/');
          Swal.fire(
            'Deleted!',
            'Su cuenta ha sido eliminada.',
            'success'
          );
        }
      }
    });
  };

  const handleGenerateNewAvatars = () => {
    setAvatars(generateRandomAvatars());
  };

  const handleSelectDefaultAvatar = () => {
    setSelectedAvatar(generateDiceBearAvatar(profile.name));
  };

  if (isLoading) {
    return <div className="text-center text-foreground">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="text-center text-destructive">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-center text-foreground">No se encontraron datos de perfil.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Editar Perfil</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Nombre:</label>
          <input
            type="text"
            {...register('name', { required: 'El Nombre es Obligatorio' })}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.name && <p className="text-destructive text-xs italic">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            {...register('email', { required: 'El Email es obligatorio' })}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
          {errors.email && <p className="text-destructive text-xs italic">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Password (En blanco no se modifica):</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
          />
        </div>

        <div>
          <label className="block text-card-foreground text-sm font-bold mb-2">Imágen del Perfil:</label>
          <div className="flex items-center mb-4">
            <img src={selectedAvatar} alt="Selected Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-primary mr-4" />
            <button type="button" onClick={handleSelectDefaultAvatar} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold py-2 px-4 rounded cursor-pointer">
              Usar el predeterminado
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {avatars.map((avatarUrl, index) => (
              <img
                key={index}
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                className={`w-24 h-24 rounded-full object-cover cursor-pointer border-2 border-amber-500 p-1 ${selectedAvatar === avatarUrl ? 'border-4 border-primary' : ''}`}
                onClick={() => setSelectedAvatar(avatarUrl)}
              />
            ))}
          </div>
          <button type="button" onClick={handleGenerateNewAvatars} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded cursor-pointer">
            Generar nuevos avatares
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-primary/90 cursor-pointer"
          >
            Actualizar Perfil
          </button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-destructive text-destructive-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-destructive/90 cursor-pointer"
          >
            Eliminar cuenta
          </button>
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded-md hover:bg-secondary/80 cursor-pointer"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;