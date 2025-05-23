// This script provides utility functions for working with user geolocation and calculating distances.
// It includes functions to get the user's current location and to calculate the distance between two coordinates.

/**
 * Gets the user's current geographic location using the browser's geolocation API.
 * Returns a Promise that resolves to an object with latitude and longitude.
 */
export async function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                resolve({ lat, lon });
            },
            error => {
                console.error("Error getting location:", error);
                reject(error);
            }
        );
    });
}

// got this from stack overflow https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
/**
 * Calculates the distance in kilometers between two latitude/longitude points using the Haversine formula.
 */
export function getDistance(lat1, lon1, lat2, lon2) { 
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Converts degrees to radians.
 * @param {number} deg - Degrees to convert.
 * @returns {number} Radians.
 */
function toRad(deg) {
    return deg * Math.PI / 180;
}