import { useParams, useNavigate } from "react-router-dom";
import { useCountryDetails } from "../../hooks/useCountryDetails";

const CountryDetailPage = () => {
  const { id } = useParams();
  const { country, isLoading, error } = useCountryDetails(id);
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center">Cargando Detalle de Países...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!country) {
    return <div className="text-center">No se encotró el País.</div>;
  }

  return (
    <>
      <div className="max-w-3xl mx-auto bg-blue-600 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {country.name?.common}
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          <img
            src={country.flags?.png}
            alt={`${country.name?.common} flag`}
            className="w-48 h-auto object-cover rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-lg">
            <p>
              <strong>Nombre oficial:</strong> {country.name?.official}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Continente:</strong> {country.region}
            </p>
            <p>
              <strong>Subregion:</strong> {country.subregion || "N/A"}
            </p>
            <p>
              <strong>Población:</strong>{" "}
              {country.population?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong>Superficie:</strong> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}
            </p>
            <p>
              <strong>Independiente:</strong> {country.independent ? "Yes" : "No"}
            </p>
            <p>
              <strong>Miembro de la ONU:</strong> {country.unMember ? "Yes" : "No"}
            </p>
            <p>
              <strong>Idiomas:</strong>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Zona Horaria:</strong>{" "}
              {country.timezones?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Continente:</strong>{" "}
              {country.continents?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Indice Gini:</strong>{" "}
              {country.gini ? Object.values(country.gini)[0] : "N/A"}
            </p>
            <p>
              <strong>Sin salida al mar:</strong> {country.landlocked ? "Yes" : "No"}
            </p>
            <p>
              <strong>Países limítrofes:</strong> {country.borders?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Latitud/Longitud:</strong>{" "}
              {country.latlng?.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-16 py-2 px-4 rounded-md inline-block"
        >
          Volver al Panel de Control
        </button>
      </div>
    </>
  );
};

export default CountryDetailPage;
