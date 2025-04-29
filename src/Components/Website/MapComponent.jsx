import React, { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { companyDetails } from "../../data/constant";

// Fix for default icon
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Create a component for the marker with auto-opening popup
const MarkerWithAutoPopup = ({ position, content }) => {
  const markerRef = useRef();

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      // Short timeout to ensure the map is fully loaded
      setTimeout(() => {
        marker.openPopup();
      }, 100);
    }
  }, []);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup>{content}</Popup>
    </Marker>
  );
};

const MapComponent = () => {
  const location = useMemo(() => [23.7957, 86.4304], []);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(location, 14);
    }
  }, [location]);

  return (
    <MapContainer
      center={location}
      zoom={14}
      className="rounded h-[60vh] md:h-auto w-full z-0"
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerWithAutoPopup
        position={location}
        content={companyDetails.address}
      />
    </MapContainer>
  );
};

export default MapComponent;
