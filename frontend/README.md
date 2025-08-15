# 🌍 GeoPaises - Frontend

¡Bienvenido al frontend de GeoPaises! Una aplicación web moderna y elegante diseñada para explorar, guardar y gestionar información de países de todo el mundo.

## ✨ Introducción

GeoPaises permite a los usuarios crear una colección personalizada de países. Puedes cargar una lista completa de países desde una API externa, agregar países manualmente o crear tu propia lista desde cero. Es la herramienta perfecta para entusiastas de la geografía, viajeros o cualquiera que desee organizar y aprender sobre los países del mundo.

## 🚀 Tecnologías Utilizadas

Este proyecto está construido con un stack de tecnologías modernas de JavaScript, enfocado en el rendimiento y la escalabilidad.

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Enrutamiento:** [React Router](https://reactrouter.com/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/)
- **Iconos:** [React Icons](https://react-icons.github.io/react-icons/)
- **Notificaciones:** [SweetAlert2](https://sweetalert2.github.io/) & [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- **Linting:** [ESLint](https://eslint.org/)

## 📂 Estructura del Proyecto

El código fuente está organizado de manera lógica y modular para facilitar el mantenimiento y la escalabilidad.

```
/src
├── assets/         # Imágenes y otros recursos estáticos
├── components/     # Componentes reutilizables (Layout, ProtectedRoute, etc.)
├── context/        # Contextos de React (AuthContext, ThemeContext)
├── hooks/          # Hooks personalizados (useCountries, useAuth, etc.)
├── pages/          # Componentes de página para cada ruta
├── services/       # Lógica para interactuar con APIs externas
└── utils/          # Funciones de utilidad
```

## 🏁 Cómo Empezar

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### **Prerrequisitos**

- [Node.js](https://nodejs.org/en/) (versión 18 o superior)
- [npm](https://www.npmjs.com/)

### **Instalación**

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Adalberto-JAB/geo_paises
    cd geo_paises/frontend
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**

    Crea un archivo `.env` en la raíz de la carpeta `frontend` y añade la URL de tu backend. Puedes copiar el archivo de ejemplo:

    ```bash
    cp .env.example .env
    ```

    Tu archivo `.env` debería verse así:

    ```
    VITE_API_URL=http://localhost:5000/api
    ```

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

    ¡La aplicación debería estar corriendo en `http://localhost:5173`!

### **Build para Producción**

Para crear una versión optimizada de la aplicación para producción, ejecuta:

```bash
npm run build
```

Esto generará los archivos estáticos en la carpeta `dist`.

## 👤 Desarrollador

Este proyecto fue desarrollado por:

- **[Jesus Adalberto Borquez]**
- **GitHub:** [@Adalberto-JAB](https://github.com/Adalberto-JAB)

*¡No dudes en contactarme para cualquier consulta o colaboración!*

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.