async function getYourCity(lat, lon, apiKey) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`);
  const data = await response.json();

  const address = data.results[0]?.address_components || [];
  const cityObj = address.find(add =>
    add.types.includes("locality")
  );
  return cityObj?.long_name || "Unknown";
}

module.exports = { getYourCity };