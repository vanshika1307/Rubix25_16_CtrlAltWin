import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "400px",
};
// Default center over India (latitude and longitude of India)
const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const SustainableStores = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(5); // Set initial zoom level
  const [selectedLocation, setSelectedLocation] = useState(null); // Track selected marker

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/api/map?lat=${lat}&lng=${lng}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const data = await response.json();
      console.log("Locations fetched:", data); // Debug
      setLocations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();
      if (geocodeData.results.length > 0) {
        const location = geocodeData.results[0].geometry.location;
        setLat(location.lat);
        setLng(location.lng);
        setZoom(12); // Zoom in after search
      } else {
        throw new Error("Location not found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setZoom(12); // Zoom in after using current location
        },
        () => {
          setError("Failed to access location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    if (lat && lng) {
      fetchLocations();
    }
  }, [lat, lng]);

  if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h1>Find Sustainable Stores</h1>
        <div>
          <input
            type="text"
            placeholder="Enter a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={useCurrentLocation}>Use Current Location</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <GoogleMap
          center={lat && lng ? { lat, lng } : defaultCenter}
          zoom={zoom}
          mapContainerStyle={containerStyle}
        >
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={{ lat: loc.location.lat, lng: loc.location.lng }}
              title={loc.name}
              onClick={() => setSelectedLocation(loc)} // Set selected location on click
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={{
                lat: selectedLocation.location.lat,
                lng: selectedLocation.location.lng,
              }}
              onCloseClick={() => setSelectedLocation(null)} // Close the InfoWindow
            >
              <div>
                <h1><strong>{selectedLocation.name}</strong></h1>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Right side info panel */}
      {selectedLocation && (
        <div
          style={{
            flex: 0.3,
            padding: "20px",
            borderLeft: "1px solid #ccc",
            marginLeft: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h1><strong>{selectedLocation.name}</strong></h1>
          <p><strong>Address:</strong> {selectedLocation.address}</p>
          <p><strong>Rating:</strong> {selectedLocation.rating}</p>
          {selectedLocation.image && (
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SustainableStores;
