

function expandReviews() {

    let revsec = document.getElementById("myreviews");
    let button = document.getElementById("expandrev")

    //this will be more sophisticated once we get 
    //the reviews in here, because I'll make it account
    //for the height of the reviews included.
    if (parseInt(revsec.style.height) < 400) {
        revsec.style.height = "1000px";

    } else {
        revsec.style.height = "350px";
    }

}

function registerEventListeners() {

    document.addEventListener("click", (event) => {

        const executeOnMatch = (selector, callback) => {
            if (event.target.matches(selector)) {
                callback(event.target);
            }
        };

        executeOnMatch("#expandrev", expandReviews);
        executeOnMatch("#change-password-btn", togglePasswordFields);
        executeOnMatch("#apply-btn", applyFilter);
        executeOnMatch("#profile-edit-btn", toggleProfileEdit);
    });

    
}

function togglePasswordFields() {
    const container = document.getElementById("change-password-container");
    container.style.display = container.style.display === "none" ? "block" : "none";
   
}

function toggleProfileEdit() {
    const fieldIds = ['firstName', 'lastName', 'email'];

    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.disabled = !field.disabled;
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    registerEventListeners();

    document.getElementById('submit').addEventListener('click', async () => {

        let newPassword = document.getElementById('newPassword').value;
        let oldPassword = document.getElementById('oldPassword').value;

        const data = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            notifications: document.getElementById('notifications').checked
        };

        if (oldPassword && newPassword) {
            data.oldPassword = oldPassword;
            data.newPassword = newPassword;
        }

        try {
            const response = await fetch(`/update-profile`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert(result.message);
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("Submission failed.");
        }
    });
});

async function getStorageCards() {
    const response = await fetch(`/ownedstorage`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;

}

async function getReviewCards() {
    const response = await fetch(`/ownedReview`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;

}

async function loadStorageCards() {
    const mainContainer = document.querySelector("#storage-card-container");
    const cards = await getStorageCards();
    if (cards.length > 0) {

        for (let card of cards) {
            mainContainer.innerHTML += card;
        }
    }
    else {
        console.log("No storages to show.");
    }
}

async function loadReviewCards() {
    //const heroContainer = document.querySelector("#hero-card-container");
    const mainContainer = document.querySelector("#review-card-container");
    const cards = await getReviewCards();
    if (cards.length > 0) {

        for (let card of cards) {
            mainContainer.innerHTML += card;
        }
    }
    else {
        mainContainer.innerHTML = 'No review to show'
        console.log("No review to show.");
    }
}

loadStorageCards();
loadReviewCards();

function applyFilter() {
    const selectedRadius = document.getElementById('distanceFilter').value;
    localStorage.setItem('radiusFilter', selectedRadius);
    updateRadiusDisplay(selectedRadius);
}

function updateRadiusDisplay(radius) {
    const display = document.getElementById('radiusDisplay');
    if (radius && radius !== 'none') {
        display.textContent = `${radius} km`;
    } else {
        display.textContent = 'None';
    }
}

// Initialize display on page load
const storedRadius = localStorage.getItem('radiusFilter') || 'none';
updateRadiusDisplay(storedRadius);

// Pre-select the dropdown to match stored value
document.getElementById('distanceFilter').value = storedRadius;
