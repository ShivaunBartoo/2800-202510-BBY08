// This script manages the user profile page, including profile editing, password changes, review/reply management, and storage card display.
// It handles geolocation, event listeners, image upload preview, modal dialogs, and AJAX requests for profile and review actions.

import { initImageUploadPreview, displayError } from './imageUploadUtil.js';
import { getUserLocation } from "./userLocation.js";

// Runs on page load to ensure geolocation is present in the URL.
async function onPageStart() {
    const currentUrl = new URL(window.location.href);
    const lat = currentUrl.searchParams.get("lat");
    const lon = currentUrl.searchParams.get("lon");

    if (!lat || !lon) {
        try {
            const location = await getUserLocation();
            const { lat, lon } = location;
            window.location.href = `/profile?lat=${lat}&lon=${lon}`;

        } catch {
            console.warn("User denied locational access... continuing on without it")
        }
    }
}
onPageStart();

/**
 * Expands or collapses the reviews section by toggling its height.
 */
function expandReviews() {
    let revsec = document.getElementById("myreviews");
    if (parseInt(revsec.style.height) < 400) {
        revsec.style.height = "1000px";
    } else {
        revsec.style.height = "350px";
    }
}

let selectedCard = null;

/**
 * Registers all event listeners for the profile page, including buttons and modal actions.
 */
function registerEventListeners() {
    document.addEventListener("click", (event) => {
        // Utility to execute a callback if the event target matches a selector.
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

/**
 * Toggles the display of the password change fields.
 */
function togglePasswordFields() {
    const container = document.getElementById("change-password-container");
    container.style.display = container.style.display === "none" ? "block" : "none";
}

/**
 * Toggles the disabled state of profile edit fields (first name, last name, email).
 */
function toggleProfileEdit() {
    const fieldIds = ['firstName', 'lastName', 'email'];
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.disabled = !field.disabled;
        }
    });
}

// Initialize event listeners and load cards on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    registerEventListeners();
    loadStorageCards();
    loadReviewCards();

    // Handles profile form submission (including password change)
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
                // if (Array.isArray(result.fields)) {
                //     highlightErrorFields(result.fields);
                // }
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

/**
 * Displays a success message in the error-message div.
 */
function showSuccess(message) {
    const msgDiv = document.querySelector(".error-message"); // reuse same div
    if (msgDiv) {
        msgDiv.textContent = message;
        msgDiv.style.display = "block";
        msgDiv.style.color = "#142e4b";
    }
}

/**
 * Fetches the user's owned storage cards from the server.
 * Returns a JSON array of card HTML strings.
 */
async function getStorageCards() {
    const response = await fetch(`/ownedstorage`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
}

/**
 * Fetches the user's owned review cards from the server.
 * Returns a JSON array of card HTML strings.
 */
async function getReviewCards() {
    const response = await fetch(`/ownedReview`);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
}

/**
 * Loads and displays the user's storage cards on the profile page.
 */
async function loadStorageCards() {
    const mainContainer = document.querySelector("#storage-card-container");
    const cards = await getStorageCards();
    if (cards.length > 0) {
        for (let card of cards) {
            mainContainer.innerHTML += card;
        }
    }
    else {
        console.warn("No storages to show.");
    }
}

/**
 * Loads and displays the user's review cards on the profile page.
 */
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
        console.warn("No review to show.");
    }
}

/**
 * Applies the selected distance filter and updates the display.
 */
function applyFilter() {
    const selectedRadius = document.getElementById('distanceFilter').value;
    localStorage.setItem('radiusFilter', selectedRadius);
    updateRadiusDisplay(selectedRadius);
}

/**
 * Updates the radius filter display text.
 */
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

/**
 * Toggles the reply form for a review and initializes image upload preview for replies.
 */
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
        previewImage
    );
}

/**
 * Handles the reply submission for a review, including image upload.
 */
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

/**
 * Opens a modal dialog by ID and shows the overlay.
 */
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
}

/**
 * Closes a modal dialog by ID and hides the overlay if no other modals are open.
 */
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

/**
 * Deletes a review or reply card from the server and removes it from the DOM.
 */
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

