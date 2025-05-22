import { initImageUploadPreview, displayError } from './imageUploadUtil.js';
import { getUserLocation, getDistance } from "./userLocation.js";

onPageStart()

async function onPageStart() {

    const currentUrl = new URL(window.location.href);
    const lat = currentUrl.searchParams.get("lat");
    const lon = currentUrl.searchParams.get("lon");

    if (!lat || !lon) {

        try {
            const location = await getUserLocation();
            const { lat, lon } = location;

            window.location.href = `/profile?lat=${lat}&lon=${lon}`;

        } catch (err) {
            console.log("User denied locational access... continuing on without it")
        }
    }

}

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
let selectedCard = null;

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
        executeOnMatch("#create-new-storage", () => {
            window.location.href = '/storage/createnew';
        });

        executeOnMatch(".reply-button", toggleReplyForm);
        executeOnMatch(".submit-reply", submitReply);

        executeOnMatch(".btn-delete", (btn) => {
            const card = btn.closest(".review, .reply");

            if (!card) return;

            selectedCard = card;
        });
        // Modal buttons

        executeOnMatch(".btn-delete", () => {
            openModal("confirmDeleteModal");
        });

        executeOnMatch("#btn-cancel-delete", () => closeModal("confirmDeleteModal"));

        executeOnMatch("#btn-confirm-delete", () => {
            deleteCard(selectedCard);
            closeModal("confirmDeleteModal");
        });

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
    loadStorageCards();
    loadReviewCards();

    document.getElementById('submit').addEventListener('click', async () => {

        let newPassword = document.getElementById('newPassword').value.trim();
        let oldPassword = document.getElementById('oldPassword').value.trim();

        const data = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            notifications: document.getElementById('notifications').checked
        };

        if (oldPassword !== '' && newPassword !== '') {
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
            if (result.error) {
                displayError(result.error);
                if (Array.isArray(result.fields)) {
                    highlightErrorFields(result.fields);
                }
            } else {
                showSuccess('Saved Change!!!');
                togglePasswordFields();
            }

        } catch (err) {
            console.error("Error submitting form:", err);
            alert("Submission failed.");
        }
    });
});

function showSuccess(message) {
    const msgDiv = document.querySelector(".error-message"); // reuse same div
    if (msgDiv) {
        msgDiv.textContent = message;
        msgDiv.style.display = "block";
        msgDiv.style.color = "#142e4b";
    }
}

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

    const mainContainer = document.querySelector("#review-card-container");
    const cards = await getReviewCards();

    mainContainer.innerHTML = "";
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

function toggleReplyForm(button) {

    const form = button.nextElementSibling;
    form.style.display = form.style.display == "none" ? "block" : "none";

    const trigger = form.querySelector('.replyuploadTrigger');
    const input = form.querySelector('.replycoverPhotoInput');
    const previewContainer = form.querySelector('.replyphotoPreview');
    const previewImage = form.querySelector('.replypreviewImage');

    initImageUploadPreview(
        trigger,
        input,
        previewContainer,
        previewImage,
        (file) => {
            console.log('User selected file:', file);
        }
    );
}

async function submitReply(button) {
const submitBtn = document.querySelector(".submit-reply");
    submitBtn.disabled = true;
    try {
        const reviewDiv = button.closest(".review");
        const reviewId = reviewDiv.dataset.reviewId;
        const textarea = reviewDiv.querySelector(".reply-textarea");
        const replyText = textarea.value.trim();
        const form = reviewDiv.querySelector(".reply-form-container");
        const fileInput = form.querySelector(".replycoverPhotoInput");
        const file = fileInput.files[0];

        if (!replyText) {
            const errorDiv = form.querySelector(".reply-error-message");
            if (errorDiv) {
                errorDiv.textContent = "Reply cannot be empty.";
                errorDiv.style.display = "block";
            }
            return;
        }

        const formData = new FormData();
        formData.append('reviewId', reviewId);
        formData.append('reply', replyText);

        if (file) {
            formData.append('photo', file);
        }

        const res = await fetch(`/replies`, {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            reviewDiv.querySelector(".reply-form-container").style.display = "none";
            loadReviewCards();
        } else {
            alert("Failed to submit reply.");
            
        }
            submitBtn.disabled = false;

    } catch (err) {
        console.error("Submit Reply Error:", err);
            submitBtn.disabled = false;

    }
}


function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById("modalOverlay");

    if (!modal) {
        console.warn(`Modal with ID ${modalId} not found.`);
        return;
    }

    if (overlay) {
        overlay.style.display = "block";
        overlay.onclick = () => closeModal(modalId);
    }

    modal.style.display = "block";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";


    console.log(`Modal ${modalId} opened.`);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById("modalOverlay");

    if (modal) {
        modal.style.display = "none";
    }

    // Hide overlay if no other modals are visible
    if (overlay) {
        // Check if any other modals are open
        const openModals = Array.from(document.querySelectorAll('[id$="Modal"]'))
            .filter(m => m.style.display === "block");
        if (openModals.length === 0) {
            overlay.style.display = "none";
            overlay.onclick = null;
        }
    }
}

function deleteCard(card) {
    const reviewId = parseInt(card.dataset.reviewId);
    const replyId = parseInt(card.dataset.replyId);
    const isReply = card.classList.contains("reply");

    fetch(isReply ? `/replies/${replyId}` : `/reviews/${reviewId}`, {
        method: "DELETE",
    }).then(res => {
        if (res.ok) {

            card.remove();
        } else {
            alert("Failed to delete.");
        }
    }).catch(err => {
        console.error("Delete failed:", err);
    });
}

