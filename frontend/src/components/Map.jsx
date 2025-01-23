import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const libraries = ["places"];
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
  const [zoom, setZoom] = useState(12);
  const [selectedLocation, setSelectedLocation] = useState(null);

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
      setLocations(data);
      console.log(data);
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
        setZoom(12);
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
          setZoom(12);
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

  if (loadError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-red-600 text-center text-xl">
          Error loading maps: {loadError.message}
        </div>
      </div>
    );

  if (!isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );

  return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="bg-gradient-to-r from-green-600 to-green-500 shadow-md p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-wide">
            Sustainable Stores
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter a location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-green-400 focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                Search
              </button>
              <button
                onClick={useCurrentLocation}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors flex items-center gap-2"
              >
                <MapPinIcon className="h-5 w-5" />
                Use My Location
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="absolute top-4 left-4 right-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <GoogleMap
            center={lat && lng ? { lat, lng } : defaultCenter}
            zoom={zoom}
            mapContainerClassName="w-full h-[calc(100vh-180px)] rounded-lg shadow-lg"
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              zoomControl: true,
            }}
          >
            {locations.map((loc, index) => (
              <Marker
                key={index}
                position={{ lat: loc.location.lat, lng: loc.location.lng }}
                title={loc.name}
                onClick={() => setSelectedLocation(loc)}
              />
            ))}

           
          </GoogleMap>
        </div>

        {selectedLocation && (
          <div className="w-96 bg-white shadow-lg p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedLocation.name}
            </h2>
            {selectedLocation.image && (
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          )}
          <p><strong>Address:</strong> {selectedLocation.address}</p>

          <p><strong>Rating:</strong> {selectedLocation.rating}</p>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.location.lat},${selectedLocation.location.lng}`,
                  "_blank"
                )
              }
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
            >
              Get Directions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SustainableStores;
