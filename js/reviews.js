import { initImageUploadPreview, displayError } from './imageUploadUtil.js';

const storageId = window.location.pathname.split("/")[2];

let isLoggedIn = false;

async function checkLoginStatus() {
    try {
        const response = await fetch("/api/session");
        isLoggedIn = response.ok;
    } catch (err) {
        isLoggedIn = false;
    }
}


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

function expandImage(element) {
    if (element.classList.contains("expanded")) {
        element.parentElement.querySelector(".review-body").prepend(element);
    } else {
        element.parentElement.parentElement.insertBefore(element, element.parentElement);
    }
    element.classList.toggle("expanded");
}

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


    //upload picture for review
    initImageUploadPreview(
        '.uploadTrigger',
        '.coverPhotoInput',
        '.photoPreview',
        '.previewImage',
        (file) => {
            console.log('User selected file:', file);
        }
    );
    getReviews();
    registerEventListeners();

    if (!isLoggedIn) {
        const addReviewButton = document.querySelector("#add-review-button");
        if (addReviewButton) {
            addReviewButton.disabled = true;
            addReviewButton.title = "Log in to add a review";
            addReviewButton.classList.add("disabled");
        }
    }
});

// Review functions
async function submitReview() {
    if (!isLoggedIn) {
        alert("Please log in to submit a review.");
        return;
    }
    const storageId = window.location.pathname.split("/")[2];

    const photoInput = document.querySelector('.coverPhotoInput').files[0];

    const review = {
        title: document.getElementById("reviewTitle").value.trim(),
        body: document.getElementById("reviewText").value.trim(),
        rating: parseInt(document.getElementById("reviewRating").value.trim(), 10),
    };
    const formData = new FormData();

    if (photoInput) {
        formData.append('photo', photoInput);
    }
    formData.append("review", JSON.stringify(review));


    try {
        console.log(storageId);
        const res = await fetch(`/reviews/${storageId}`, {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            resetReviewForm();
            closeModal("reviewModal");
            await getReviews();
        } else {
            const data = await res.json();
            displayError(data.error);
            alert("Failed to submit review. Please try again");
        }
    } catch (err) {
        console.log(err);
    }
}

function resetReviewForm() {
    document.getElementById("reviewTitle").value = "";
    document.getElementById("reviewText").value = "";
    document.getElementById("reviewRating").value = "";
}

async function getReviews() {
    try {
        const storageId = window.location.pathname.split("/")[2];
        const response = await fetch(`/api/reviews/${storageId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reviews = await response.text();
        document.getElementById('reviews-container').innerHTML = reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        document.getElementById('reviews-container').innerHTML =
            '<p>Error loading reviews. Please try again later.</p>';
    }
}
let selectedCard = null;

//replies
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
    if (!isLoggedIn) {
        alert("Please log in to reply to a review.");
        return;
    }

    try {
        const reviewDiv = button.closest(".review");
        const reviewId = reviewDiv.dataset.reviewId;
        const textarea = reviewDiv.querySelector(".reply-textarea");
        const replyText = textarea.value.trim();
        const form = reviewDiv.querySelector(".reply-form-container");
        const fileInput = form.querySelector(".replycoverPhotoInput");
        const file = fileInput.files[0];

        if (!replyText) {
            alert("Reply cannot be empty.");
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
            getReviews();
        } else {
            const data = await res.json();
            displayError(data.error);
            alert("Failed to submit reply.");
        }
    } catch (err) {
        console.error("Submit Reply Error:", err);
    }
};

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

