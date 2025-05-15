import { getUserLocation, getDistance } from "./userLocation.js";

initialize();

async function initialize() {
    await loadCards();
    setupFilterButtons();
}

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

async function getCards() {
    let location = await getUserLocation();
    const response = await fetch(`/api/browse?lat=${location.lat}&lon=${location.lon}`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
}

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
        console.log("No fridges to show.");
    }
}

function labelType(store) {
    const typeElement = store.querySelector(".card-storage-type");
    if (typeElement.innerHTML == "community fridge") {
        store.classList.add("fridge");
    } else {
        store.classList.add("pantry");
    }
}

function addFavouriteButtonListener(element) {
    element.addEventListener("click", async (event) => {
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
            console.log("Error adding to favourites");
        }
    });
}
