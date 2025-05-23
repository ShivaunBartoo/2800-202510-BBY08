// This script manages the reviews and replies UI for a storage location page.
// It handles review/reply submission, image upload preview, review expansion, and modal dialogs.

import { initImageUploadPreview, displayError, highlightErrorFields } from "./imageUploadUtil.js";

let isLoggedIn = false;

/**
 * Checks the user's login status by querying the session API.
 * Sets the isLoggedIn variable accordingly.
 */
async function checkLoginStatus() {
    try {
        const response = await fetch("/api/session");
        isLoggedIn = response.ok;
    } catch {
        isLoggedIn = false;
    }
}

/**
 * Expands or collapses a review body and updates the read more/less button text.
 */
function expandReview(element) {
    const body = element.previousElementSibling;
    if (body) {
        if (body.classList.contains("expanded")) {
            element.innerHTML = "...read more";
        } else {
            element.innerHTML = "read less";
        }
        body.classList.toggle("expanded");
    }
}

/**
 * Expands or collapses a review image within the review card.
 */
function expandImage(element) {
    if (element.classList.contains("expanded")) {
        element.parentElement.querySelector(".review-body").prepend(element);
    } else {
        element.parentElement.parentElement.insertBefore(element, element.parentElement);
    }
    element.classList.toggle("expanded");
}

/**
 * Updates the visibility of the read more button based on review body overflow.
 */
function updateReadMoreButton() {
    document.querySelectorAll(".review-body").forEach((body) => {
        const readMore = body.nextElementSibling;
        // Check if the review body has overflow.
        if (body.scrollHeight > body.clientHeight) {
            readMore.style.display = "block";
        } else {
            readMore.style.display = "none";
        }
    });
}

// Main initialization
document.addEventListener("DOMContentLoaded", async () => {
    await checkLoginStatus();

    // Disable Add Review button if not logged in
    const addReviewButton = document.querySelector("#add-review-button");
    if (!isLoggedIn && addReviewButton) {
        addReviewButton.disabled = true;
        addReviewButton.title = "Log in to add a review";
        addReviewButton.classList.add("disabled");
        addReviewButton.style.pointerEvents = "none";
    }

    initImageUploadPreview(
        '.uploadTrigger',
        '.coverPhotoInput',
        '.photoPreview',
        '.previewImage'
    );

    await getReviews();
    registerEventListeners();
});

/**
 * Handles review submission, including validation and image upload.
 */
async function submitReview() {
    if (!isLoggedIn) {
        alert("Please log in to submit a review.");
        return;
    }
    const submitBtn = document.querySelector("#submit-review-button");
    submitBtn.disabled = true;
    const storageId = window.location.pathname.split("/")[2];

    const photoInput = document.querySelector(".coverPhotoInput").files[0];

    let reviewTitle = document.getElementById("reviewTitle");
    let reviewRating = document.querySelector('input[name="rating"]:checked');
    let reviewText = document.getElementById("reviewText");

    const review = {
        title: reviewTitle.value.trim(),
        body: reviewText.value.trim(),
        rating: reviewRating ? parseInt(reviewRating.value, 10) : null,
    };

    let emptyField = false;
    if (reviewTitle.value.trim() == "") {
        reviewTitle.style.border = "solid #ac6872";
        displayError("Highlighted fields cannot be empty.");
        emptyField = true;
    }

    if (!reviewRating) {
        document.querySelector("#reviewRating").style.border = "solid #ac6872";
        displayError("Highlighted fields cannot be empty.");
        emptyField = true;
    }
    if (reviewText.value.trim() == "") {
        reviewText.style.border = "solid #ac6872";
        displayError("Highlighted fields cannot be empty.");
        emptyField = true;
    }

    if (!emptyField) {
        const formData = new FormData();

        if (photoInput) {
            formData.append("photo", photoInput);
        }
        formData.append("review", JSON.stringify(review));

        try {
            const res = await fetch(`/reviews/${storageId}`, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                resetReviewForm();
                closeModal("reviewModal");
                await getReviews();
            } else {
                const data = await res.json();
                displayError(data.error);

                if (Array.isArray(data.fields)) {
                    highlightErrorFields(data.fields);
                }
            }

            submitBtn.disabled = false;

        } catch (err) {
            console.error('Submiting review error: ', err);
            submitBtn.disabled = false;

        }
    }
}

/**
 * Resets the review form fields to their default state.
 */
function resetReviewForm() {
    document.getElementById("reviewTitle").value = "";
    document.getElementById("reviewText").value = "";
    // Uncheck all rating radio buttons
    document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false);
}

/**
 * Fetches and displays the reviews for the current storage location.
 */
async function getReviews() {
    try {
        const storageId = window.location.pathname.split("/")[2];
        const response = await fetch(`/api/reviews/${storageId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reviews = await response.text();
        document.getElementById("reviews-container").innerHTML = reviews;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        document.getElementById("reviews-container").innerHTML =
            "<p>Error loading reviews. Please try again later.</p>";
    }
}
let selectedCard = null;

//replies

/**
 * Registers all event listeners for review and reply actions, including modals and delete.
 */
function registerEventListeners() {
    document.addEventListener("click", (event) => {
        const executeOnMatch = (selector, callback) => {
            if (event.target.closest(selector)) {
                callback(event.target);
            }
        };

        executeOnMatch(".read-more", expandReview);
        executeOnMatch(".review-image", expandImage);
        executeOnMatch(".reply-button", toggleReplyForm);
        executeOnMatch(".submit-reply", submitReply);
        executeOnMatch("#add-review-button", () => openModal("reviewModal"));
        executeOnMatch(".close-modal-button", () => closeModal("reviewModal"));
        executeOnMatch("#submit-review-button", submitReview);
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

    document.addEventListener("DOMContentLoaded", updateReadMoreButton);
    window.addEventListener("resize", updateReadMoreButton);
}

/**
 * Toggles the reply form for a review and initializes image upload preview for replies.
 */
function toggleReplyForm(button) {
    const form = button.nextElementSibling;
    form.style.display = form.style.display == "none" ? "block" : "none";

    const trigger = form.querySelector(".replyuploadTrigger");
    const input = form.querySelector(".replycoverPhotoInput");
    const previewContainer = form.querySelector(".replyphotoPreview");
    const previewImage = form.querySelector(".replypreviewImage");

    initImageUploadPreview(trigger, input, previewContainer, previewImage);
}

/**
 * Handles the reply submission for a review, including image upload.
 */
async function submitReply(button) {
    if (!isLoggedIn) {
        alert("Please log in to reply to a review.");
        return;
    }
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
        formData.append("reviewId", reviewId);
        formData.append("reply", replyText);

        if (file) {
            formData.append("photo", file);
        }

        const res = await fetch(`/replies`, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            reviewDiv.querySelector(".reply-form-container").style.display = "none";
            getReviews();
        } else {
            const data = await res.json();
            displayError(data.error);
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
    if (!isLoggedIn) {
        alert("Please log in to add a review.");
        return;
    }
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

    modal.style.display = "flex";
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
        const openModals = Array.from(document.querySelectorAll('[id$="Modal"]')).filter(
            (m) => m.style.display === "block"
        );
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
    })
        .then((res) => {
            if (res.ok) {
                card.remove();
            } else {
                alert("Failed to delete.");
            }
        })
        .catch((err) => {
            console.error("Delete failed:", err);
        });
}
