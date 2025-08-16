import { useProfile } from '../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { profile, isLoading, error } = useProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center text-foreground">Cargando el Perfil...</div>;
  }

  if (error) {
    return <div className="text-center text-destructive">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-center text-foreground">No se encontraron datos del perfil.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-700 p-8 mt-20 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Perfil de usuario</h1>
      <div className="flex flex-col items-center mb-6">
        <img 
          src={profile.profilePictureUrl || `https://api.dicebear.com/8.x/adventurer/svg?seed=${profile.name}`}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4"
        />
        <h2 className="text-2xl font-semibold text-foreground">{profile.name}</h2>
        <p className="text-muted-foreground">{profile.email}</p>
      </div>
      <div className="flex space-x-4 justify-center">
        <button 
          onClick={() => navigate('/edit-profile')} 
          className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-md hover:bg-primary/90"
        >
          Editar perfil
        </button>
        <button 
          onClick={() => navigate('/')} 
          className="bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded-md hover:bg-secondary/80"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;