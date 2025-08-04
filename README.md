<!-- /*
Real Estate Technical Assessment (60 minutes)

OBJECTIVE:
Create a property explorer application that allows users to search, filter,
and view real estate properties.

API ENDPOINTS:
- GET /api/properties - List all properties (supports pagination & filters)
- GET /api/properties/{id} - Get property details
- GET /api/locations - Get available locations/neighborhoods

REQUIREMENTS:

1. Property Grid/List View
   - Display properties in a responsive grid
   - Show key information: image, price, location, bedrooms, area
   - Implement loading states
   - Handle errors gracefully

2. Filtering System
   - Price range
   - Number of bedrooms
   - Property type (House, Apartment, etc.)
   - Location/neighborhood
   - Area range

3. Map View
   - Toggle between grid and map views
   - Show property markers on map
   - Basic marker clustering for dense areas
   - Property preview on marker click

4. Search & Sort
   - Search by location or property features
   - Sort by price (asc/desc)
   - Sort by date listed

BONUS:
- URL params for filter state
- Responsive design
- Performance optimizations
- Clean code architecture
- TypeScript usage

Good luck!
*/ -->

<!-- # Property Explorer

## Descripción

Property Explorer es una aplicación React que permite a los usuarios explorar propiedades inmobiliarias. Los usuarios pueden filtrar propiedades según diferentes criterios, como rango de precio, número de habitaciones y tipo de propiedad. También pueden ver las propiedades en una vista de cuadrícula o en un mapa.

## Estructura del Proyecto

- **src/**
  - **api/**: Contiene las funciones para acceder a la API de propiedades.
  - **components/**: Componentes reutilizables como `MapView`.
  - **App.js**: Componente principal de la aplicación.
  - **App.css**: Estilos de la aplicación.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/{tu_usuario}/front_technical.git
   cd front_technical
   npm i react
   npm i react-router-dom
   npm install react-leaflet-markercluster
   npm start

   Estado de la Aplicación:
   La aplicación utiliza varios estados para manejar los datos de las propiedades y las configuraciones de filtrado:

   properties: Lista de propiedades cargadas desde la API.
   locations: Lista de ubicaciones para el filtrado.
   loading: Estado que indica si los datos están siendo cargados.
   error: Mensaje de error en caso de que la carga falle.
   priceRange, bedrooms, propertyType, locationFilter, areaRange, searchTerm, sortOption: Estados para manejar los filtros de búsqueda.
   Filtrado y Ordenamiento
   Los usuarios pueden filtrar las propiedades utilizando los siguientes criterios:

   Rango de Precio: Especifica un rango de precios mínimo y máximo.
   Número de Habitaciones: Filtra por el número de habitaciones.
   Tipo de Propiedad: Selecciona el tipo de propiedad (Casa, Apartamento, etc.).
   Ubicación: Filtra por ubicación.
   Rango de Área: Especifica un rango de área mínimo y máximo.
   Término de Búsqueda: Permite buscar propiedades por nombre o características.
   Ordenar: Permite ordenar las propiedades por precio o fecha de listado.
   Vista de Carga
   Mientras se cargan los datos, se muestra un spinner con el mensaje "Cargando...".

   Componente Principal
   El componente principal App se encarga de:

   Cargar las propiedades y ubicaciones desde la API.
   Manejar los estados de filtrado y actualización de URL.
   Renderizar la vista de cuadrícula o el mapa según la selección del usuario.
   Ejemplo de Uso
   Para usar la aplicación, simplemente inicia el servidor y navega a http://localhost:3000. Desde allí, puedes aplicar filtros y ver las    propiedades en diferentes vistas.
   -->
<!-- /*
Real Estate Technical Assessment (60 minutes)

OBJECTIVE:
Create a property explorer application that allows users to search, filter,
and view real estate properties.

API ENDPOINTS:
- GET /api/properties - List all properties (supports pagination & filters)
- GET /api/properties/{id} - Get property details
- GET /api/locations - Get available locations/neighborhoods

REQUIREMENTS:

1. Property Grid/List View
   - Display properties in a responsive grid
   - Show key information: image, price, location, bedrooms, area
   - Implement loading states
   - Handle errors gracefully

2. Filtering System
   - Price range
   - Number of bedrooms
   - Property type (House, Apartment, etc.)
   - Location/neighborhood
   - Area range

3. Map View
   - Toggle between grid and map views
   - Show property markers on map
   - Basic marker clustering for dense areas
   - Property preview on marker click

4. Search & Sort
   - Search by location or property features
   - Sort by price (asc/desc)
   - Sort by date listed

BONUS:
- URL params for filter state
- Responsive design
- Performance optimizations
- Clean code architecture
- TypeScript usage

Good luck!
*/ -->

<!-- # Property Explorer

## Descripción

Property Explorer es una aplicación React que permite a los usuarios explorar propiedades inmobiliarias. Los usuarios pueden filtrar propiedades según diferentes criterios, como rango de precio, número de habitaciones y tipo de propiedad. También pueden ver las propiedades en una vista de cuadrícula o en un mapa.

## Estructura del Proyecto

- **src/**
  - **api/**: Contiene las funciones para acceder a la API de propiedades.
  - **components/**: Componentes reutilizables como `MapView`.
  - **App.js**: Componente principal de la aplicación.
  - **App.css**: Estilos de la aplicación.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/{tu_usuario}/front_technical.git
   cd front_technical
   npm install
   npm i react
   npm i react-router-dom
   npm install react-leaflet-markercluster
   npm start

   Estado de la Aplicación:
   La aplicación utiliza varios estados para manejar los datos de las propiedades y las configuraciones de filtrado:

   properties: Lista de propiedades cargadas desde la API.
   locations: Lista de ubicaciones para el filtrado.
   loading: Estado que indica si los datos están siendo cargados.
   error: Mensaje de error en caso de que la carga falle.
   priceRange, bedrooms, propertyType, locationFilter, areaRange, searchTerm, sortOption: Estados para manejar los filtros de búsqueda.
   Filtrado y Ordenamiento
   Los usuarios pueden filtrar las propiedades utilizando los siguientes criterios:

   Rango de Precio: Especifica un rango de precios mínimo y máximo.
   Número de Habitaciones: Filtra por el número de habitaciones.
   Tipo de Propiedad: Selecciona el tipo de propiedad (Casa, Apartamento, etc.).
   Ubicación: Filtra por ubicación.
   Rango de Área: Especifica un rango de área mínimo y máximo.
   Término de Búsqueda: Permite buscar propiedades por nombre o características.
   Ordenar: Permite ordenar las propiedades por precio o fecha de listado.
   Vista de Carga
   Mientras se cargan los datos, se muestra un spinner con el mensaje "Cargando...".

   Componente Principal
   El componente principal App se encarga de:

   Cargar las propiedades y ubicaciones desde la API.
   Manejar los estados de filtrado y actualización de URL.
   Renderizar la vista de cuadrícula o el mapa según la selección del usuario.
   Ejemplo de Uso
   Para usar la aplicación, simplemente inicia el servidor y navega a http://localhost:3000. Desde allí, puedes aplicar filtros y ver las    propiedades en diferentes vistas.
   -->
