import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { propertyApi } from "./api/propertyApi";
import MapView from "./components/MapView";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtrado
  const [priceRange, setPriceRange] = useState([0, 1200000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [areaRange, setAreaRange] = useState([0, 200]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [view, setView] = useState("grid");

  const navigate = useNavigate();
  const location = useLocation();

  const paramsRef = useRef({}); // Usar useRef para almacenar los parámetros

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesResponse = await propertyApi.getProperties({ page: 1 });
        setProperties(propertiesResponse.data);
        const locationsResponse = await propertyApi.getLocations();
        setLocations(locationsResponse);
      } catch (err) {
        setError("Error al cargar los datos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newParams = {
      priceMin: params.get("priceMin"),
      priceMax: params.get("priceMax"),
      bedrooms: params.get("bedrooms"),
      propertyType: params.get("propertyType"),
      location: params.get("location"),
      areaMin: params.get("areaMin"),
      areaMax: params.get("areaMax"),
      search: params.get("search"),
      sort: params.get("sort"),
    };

    // Solo actualiza el estado si los parámetros han cambiado
    if (JSON.stringify(newParams) !== JSON.stringify(paramsRef.current)) {
      paramsRef.current = newParams; // Actualiza el ref
      if (newParams.priceMin) {
        setPriceRange([
          Number(newParams.priceMin),
          newParams.priceMax ? Number(newParams.priceMax) : 1200000,
        ]);
      }
      if (newParams.bedrooms) setBedrooms(Number(newParams.bedrooms));
      if (newParams.propertyType) setPropertyType(newParams.propertyType);
      if (newParams.location) setLocationFilter(Number(newParams.location));
      if (newParams.areaMin) {
        setAreaRange([
          Number(newParams.areaMin),
          newParams.areaMax ? Number(newParams.areaMax) : 200,
        ]);
      }
      if (newParams.search) setSearchTerm(newParams.search);
      if (newParams.sort) setSortOption(newParams.sort);
    }
  }, [location]);

  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();
    params.set("priceMin", priceRange[0]);
    params.set("priceMax", priceRange[1]);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (propertyType) params.set("propertyType", propertyType);
    if (locationFilter) params.set("location", locationFilter);
    params.set("areaMin", areaRange[0]);
    params.set("areaMax", areaRange[1]);
    if (searchTerm) params.set("search", searchTerm);
    if (sortOption) params.set("sort", sortOption);
    navigate(`?${params.toString()}`);
  }, [
    priceRange,
    bedrooms,
    propertyType,
    locationFilter,
    areaRange,
    searchTerm,
    sortOption,
    navigate,
  ]);

  useEffect(() => {
    updateUrlParams();
  }, [updateUrlParams]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">Ha ocurrido un error.</div>;
  }

  // Filtrar propiedades (sin cambios)
  const filteredProperties = properties.filter((property) => {
    const withinPriceRange =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = bedrooms ? property.bedrooms === bedrooms : true;
    const matchesPropertyType = propertyType
      ? property.propertyType === propertyType
      : true;
    const matchesLocation = locationFilter
      ? property.locationId === locationFilter
      : true;
    const withinAreaRange =
      property.area >= areaRange[0] && property.area <= areaRange[1];
    const matchesSearchTerm =
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
      withinPriceRange &&
      matchesBedrooms &&
      matchesPropertyType &&
      matchesLocation &&
      withinAreaRange &&
      matchesSearchTerm
    );
  });

  // Ordenar propiedades (sin cambios)
  const sortedProperties = filteredProperties.sort((a, b) => {
    if (sortOption === "priceAsc") {
      return a.price - b.price;
    } else if (sortOption === "priceDesc") {
      return b.price - a.price;
    } else if (sortOption === "dateListed") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    return 0;
  });

  const handleMarkerClick = (property) => {
    alert(`Propiedad seleccionada: ${property.location}`);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>PROPERTY EXPLORER</h1>
        <button onClick={() => setView(view === "grid" ? "map" : "grid")}>
          Change to {view === "grid" ? "Map 🗺️" : "Grid 🟪"}
        </button>
      </header>

      <main className="main-content">
        <aside className="filters-panel">
          <h2>Filters</h2>
          {/* Campo de búsqueda */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>

          {/* Rango de Precio */}
          <div className="price-range-container">
            <label htmlFor="priceRange">Price Range:</label>
            <div className="price-inputs">
              <input
                id="priceMin"
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                placeholder="Min"
                className="price-input min-price"
              />
              <input
                id="priceMax"
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                placeholder="12000"
                className="price-input max-price"
              />
            </div>
          </div>
          <div>
            <label className="price-inputs">Number of Rooms:</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
            />
          </div>

          <div>
            <div>
              <label htmlFor="propertyType">Property Type:</label>
              <select
                id="propertyType"
                onChange={(e) => setPropertyType(e.target.value)}
                className="custom-select"
              >
                <option value="">All</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Duplex">Duplex</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div>
              <label htmlFor="location">Ubication:</label>
              <select
                id="location"
                onChange={(e) => setLocationFilter(Number(e.target.value))}
                className="custom-select"
              >
                <option value="">All</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Opciones de ordenamiento */}
          <div>
            <label>Order for:</label>
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="custom-select"
            >
              <option value="">Not order</option>
              <option value="priceAsc">Ascending Price</option>
              <option value="priceDesc">Descending price</option>
              <option value="dateListed">Listing Date</option>
            </select>
          </div>
          {/* Rango de Área */}
          <div className="area-range-container">
            <label htmlFor="areaRange">Area Range:</label>
            <div className="area-inputs">
              <input
                id="areaMin"
                type="number"
                value={areaRange[0]}
                onChange={(e) =>
                  setAreaRange([Number(e.target.value), areaRange[1]])
                }
                className="area-input min-area"
              />
              <input
                id="areaMax"
                type="number"
                value={areaRange[1]}
                onChange={(e) =>
                  setAreaRange([areaRange[0], Number(e.target.value)])
                }
                className="area-input max-area"
              />
            </div>
          </div>
        </aside>

        <section className="properties-view">
          {view === "grid" ? (
            <div className="properties-grid">
              {sortedProperties.map((property) => (
                <div className="property-card" key={property.id}>
                  <img src={property.image} alt={property.location} />
                  <h2>{property.location}</h2>
                  <p>Price: ${property.price}</p>
                  <p>Rooms: {property.bedrooms}</p>
                  <p>Area: {property.area} m²</p>
                  <p>Property Type: {property.propertyType} </p>
                </div>
              ))}
            </div>
          ) : (
            <MapView
              properties={sortedProperties.map((property) => ({
                id: property.id,
                image: property.image,
                price: property.price,
                location: property.location,
                locationId: property.locationId,
                bedrooms: property.bedrooms,
                area: property.area,
                propertyType: property.propertyType,
                lat: property.lat,
                lng: property.lng,
              }))}
              onMarkerClick={handleMarkerClick}
            />
          )}
        </section>
      </main>
    </div>
  );
};

const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);

export default MainApp;
