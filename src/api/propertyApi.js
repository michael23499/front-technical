import { mockProperties, mockLocations } from "./mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const propertyApi = {
  getProperties: async ({ page = 1, filters = {} }) => {
    await delay(400);

    let filtered = [...mockProperties];

    // Filtrar por rango de precios
    if (filters.priceRange) {
      filtered = filtered.filter(
        (p) =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    // Log de los datos filtrados
    console.log("Filtered Properties:", filtered);

    return {
      data: filtered.slice((page - 1) * 12, page * 12),
      total: filtered.length,
      page,
    };
  },

  getProperty: async (id) => {
    await delay(500);
    const property = mockProperties.find((p) => p.id === id);

    // Log de la propiedad encontrada
    console.log("Property Details:", property);

    return property;
  },

  getLocations: async () => {
    await delay(300);
    // Log de las ubicaciones
    console.log("Available Locations:", mockLocations);
    return mockLocations;
  },
};
