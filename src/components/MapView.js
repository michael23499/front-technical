// src/components/MapView.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerCluster from "react-leaflet-markercluster"; // Cambié el nombre de importación
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapView = ({ properties, onMarkerClick }) => {
  return (
    <MapContainer
      center={[40.4168, -3.7038]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerCluster>
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat, property.lng]}
            eventHandlers={{
              click: () => {
                onMarkerClick(property);
              },
            }}
          >
            <Popup>{property.location}</Popup>
          </Marker>
        ))}
      </MarkerCluster>
    </MapContainer>
  );
};

export default MapView;
