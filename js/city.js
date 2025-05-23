// This script provides a utility function to get the city name from latitude and longitude coordinates using the Google Maps Geocoding API.

/**
 * Gets the city name for the given latitude and longitude using the Google Maps Geocoding API.
 * Returns the city name as a string, or "Unknown" if not found.
 */
async function getYourCity(lat, lon, apiKey) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`);
  const data = await response.json();

  // Extract address components from the first result
  const address = data.results[0]?.address_components || [];
  // Find the component with type "locality" (city)
  const cityObj = address.find(add =>
    add.types.includes("locality")
  );
  return cityObj?.long_name || "Unknown";
}

module.exports = { getYourCity };