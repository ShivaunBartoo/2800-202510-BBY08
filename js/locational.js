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

function openMap() {
    const googleMapsUrl = `https://www.google.com/maps?q=${storelat},${storelon}`;
    window.open(googleMapsUrl, "_blank");
}

async function getDistanceToFridge(fridgeId) {
    let userlocation = await getUserLocation();
    let storagelocation = await getFridgePosition(fridgeId);
    let distance = getDistance(userlocation.lat, userlocation.lon, storagelocation.lat, storagelocation.lon);
    return distance;
}
