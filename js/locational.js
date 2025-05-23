// This script manages the map view for a storage location page.
// It fetches the Google Maps API key, retrieves the storage location's coordinates, and embeds a Google Map for that location.

/**
 * Fetches the latitude and longitude for a given fridge/storage location by ID.
 * Updates global variables storelat and storelon with the coordinates.
 */
let storelat, storelon;

function getFridgePosition(fridgeId) {
    // let params = new URLSearchParams(window.location.search);
    let storageId = fridgeId; // params.get("id");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/storageloc?id=${storageId}`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            storelat = data.latitude;
            storelon = data.longitude;

            return { storelat, storelon };
        }
    };
    xhr.send();
}

loadMapView();

/**
 * Loads and embeds the Google Map for the current storage location.
 * Fetches the Google Maps API key and storage coordinates, then sets the map iframe src.
 */
function loadMapView() {
    const mapElement = document.getElementById("map");
    if (mapElement) {
        const storageId = window.location.pathname.split("/")[2];
        const apixhr = new XMLHttpRequest();
        apixhr.open("GET", "/gmapkey");
        apixhr.onreadystatechange = function () {
            if (apixhr.readyState === 4 && apixhr.status === 200) {
                const apiKey = JSON.parse(apixhr.responseText).apiKey;

                const xhr = new XMLHttpRequest();
                xhr.open("GET", `/storageloc/${storageId}`);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let data = JSON.parse(xhr.responseText);
                        storelat = data.latitude;
                        storelon = data.longitude;

                        // Embed the Google Map with the retrieved coordinates and API key
                        const googleEmbed = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${storelat},${storelon}`;
                        mapElement.src = googleEmbed;
                    }
                };
                xhr.send();
            }
        };
        apixhr.send();
    }
}

