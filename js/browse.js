// This script manages the browse page for storage locations (fridges/pantries).
// It handles user geolocation, card loading and filtering, favourite toggling, and map display with Google Maps integration.

import { getUserLocation } from "./userLocation.js";

const radiusFilter = localStorage.getItem('radiusFilter');

initialize();

//Check if user is logged in for the browse page.
let isLoggedIn = false;

/**
 * Checks the user's login status by querying the session API.
 * Sets the isLoggedIn variable accordingly.
 */
async function checkLoginStatus() {
    try {
        const res = await fetch("/api/session");
        isLoggedIn = res.ok;
    } catch {
        isLoggedIn = false;
    }
}

/**
 * Initializes the browse page.
 * Checks login status, ensures geolocation is present, and loads cards and filter buttons.
 */
async function initialize() {
    await checkLoginStatus();

    const currentUrl = new URL(window.location.href);
    const lat = currentUrl.searchParams.get("lat");
    const lon = currentUrl.searchParams.get("lon");

    if (!lat || !lon) {
        // If no geolocation in URL, get user location and reload with coordinates
        const location = await getUserLocation();
        const { lat, lon } = location;

        window.location.href = `/browse?lat=${lat}&lon=${lon}`;
        return;
    }

    await loadCards();
    setupFilterButtons();
}

/**
 * Sets up event listeners for the filter buttons (all, fridge, pantry).
 * Applies the appropriate filter class to the main card container.
 */
function setupFilterButtons() {
    const buttons = document.querySelectorAll(".filter-button");
    const mainContainer = document.querySelector("#main-card-container");
    for (let button of buttons) {
        button.addEventListener("click", (event) => {
            buttons.forEach((button) => button.classList.remove("active"));
            event.target.classList.add("active");
            switch (event.target.name) {
                case "all":
                    mainContainer.classList.remove("filter-fridge", "filter-pantry");
                    break;
                case "fridge":
                    mainContainer.classList.add("filter-fridge");
                    mainContainer.classList.remove("filter-pantry");
                    break;
                case "pantry":
                    mainContainer.classList.add("filter-pantry");
                    mainContainer.classList.remove("filter-fridge");
                    break;
            }
        });
    }
}

/**
 * Fetches the list of storage cards from the API, using the user's location and radius filter.
 * Returns a JSON array of card HTML strings.
 */
async function getCards() {
    let location = await getUserLocation();
    const response = await fetch(`/api/browse?lat=${location.lat}&lon=${location.lon}&radiusFilter=${radiusFilter}`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
}

/**
 * Loads and displays the storage cards on the page.
 * Handles hero card, main cards, and disables favourite buttons if not logged in.
 */
async function loadCards() {
    const heroContainer = document.querySelector("#hero-card-container");
    const mainContainer = document.querySelector("#main-card-container");
    //List is returned already sorted first by distance, and then by favourite status
    const cards = await getCards();
    if (cards.length > 0) {
        //The hero card is the first one in the list (closest favourite)
        heroContainer.innerHTML = cards.shift();
        heroContainer.firstChild.classList.add("hero");
        for (let card of cards) {
            mainContainer.innerHTML += card;
        }
        const cardElements = document.querySelectorAll(".storage-card");
        cardElements.forEach((card) => {
            labelType(card);
            addFavouriteButtonListener(card.querySelector(".card-favourite"));
        });
    } else {
        console.error("No fridges to show.");
    }

    // If not logged in, disable favourite buttons and show tooltip
    if (!isLoggedIn) {
        document.querySelectorAll(".card-favourite").forEach(btn => {
            btn.disabled = true;
            btn.title = "Log in to use favourites";
            btn.classList.add("disabled"); // Optional: for styling
        });
    }
}

/**
 * Adds a class to the card element based on its storage type (fridge or pantry).
 */
function labelType(store) {
    const typeElement = store.querySelector(".card-storage-type");
    if (typeElement.innerHTML == "community fridge") {
        store.classList.add("fridge");
    } else {
        store.classList.add("pantry");
    }
}

/**
 * Adds a click event listener to the favourite button on a card.
 * Handles toggling favourite status and sending the update to the server.
 */
function addFavouriteButtonListener(element) {
    if (element) {
        element.addEventListener("click", async (event) => {
            event.preventDefault();
            if (!isLoggedIn) {
                alert("Please log in to add favourites.");
                return;
            }

            const id = element.dataset.id;
            event.preventDefault();
            element.classList.toggle("active");
            const response = await fetch("/api/favourite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                console.error("Error adding to favourites");
            }
        });
    }
}

let mapexist = false;

/**
 * Initializes and displays the Google Map with storage location markers.
 * Adds click events to markers to show info bubbles with links.
 */
async function makeMap() {
    const currentUrl = new URL(window.location.href);
    let lat = parseFloat(currentUrl.searchParams.get("lat"));
    let lon = parseFloat(currentUrl.searchParams.get("lon"));
    const userlocation = { lat, lng: lon };
    const embed = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 12,
            center: userlocation,
            mapId: "7d132bec7a563178eaf5cb41"

        });

    new google.maps.marker.AdvancedMarkerElement({
        position: userlocation,
        map: embed,
        title: "You are here",

    });

    const storageCard = new InfoBubble({
        minWidth: 160,
        minHeight: 75,
        shadowStyle: 1,
        padding: 10,
        borderRadius: 10,
        arrowSize: 10,
        borderWidth: 1,
        borderColor: '#96aac4',
        backgroundColor: '#ceddf1',
        disableAutoPan: true,
        hideCloseButton: true,
        arrowPosition: 50,
        backgroundClassName: 'infobubble-background',
        arrowStyle: 0,
    });

    const result = await fetch('/api/fridgePoint');
    const points = await result.json();

    points.forEach(point => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            id: point.id,
            position: { lat: point.lat, lng: point.lon },
            map: embed,
            title: point.name || "Fridge"
        });

        marker.addEventListener('click', () => {
            storageCard.setContent(`<div class="storageCard">
            <a href="/contents/${point.id}"> <strong>${point.name}</strong> </a>
            <a href=https://www.google.com/maps?q=${point.lat},${point.lon}> Directions </a>
            </div>
`);
            storageCard.setPosition(marker.position);
            storageCard.open(embed);
        })

    });

}

/**
 * Sets up the map toggle button to show/hide the map and card containers.
 * Initializes the map only once when first shown.
 */
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleMap");
    const mapContainer = document.getElementById("mapContainer");
    const cardContainer = document.getElementById("main-card-container")

    toggleBtn.addEventListener("click", () => {
        const isHidden = mapContainer.style.display === "none";
        
        mapContainer.style.display = isHidden ? "block" : "none";
        cardContainer.style.display = isHidden ? "none" : "flex";
        if (isHidden && !mapexist) {
            makeMap();
            mapexist = true;
        }
    });
});