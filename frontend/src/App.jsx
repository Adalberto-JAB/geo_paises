import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Profile/LoginPage';
import RegisterPage from './pages/Profile/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/Profile/ProfilePage';
import EditProfilePage from './pages/Profile/EditProfilePage';
import LoadCountriesPage from './pages/countries/LoadCountriesPage';
import AddCountryFromAPIPage from './pages/countries/CreateCountryPage';
import AddManualCountryPage from './pages/countries/AddManualCountryPage';
import EditCountryPage from './pages/countries/EditCountryPage';
import CountryDetailPage from './pages/countries/CountryDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="load-countries" element={<LoadCountriesPage />} />
          <Route path="add-country-api" element={<AddCountryFromAPIPage />} />
          <Route path="add-manual-country" element={<AddManualCountryPage />} />
          <Route path="edit-country/:id" element={<EditCountryPage />} />
          <Route path="country/:id" element={<CountryDetailPage />} />
        </Route>

        {/* Catch all - 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;