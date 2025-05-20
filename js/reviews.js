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

// add review modal scripts
function openModal() {
    if (!isLoggedIn) {
        alert("Please log in to add a review.");
        return;
    }
    document.getElementById("reviewModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("reviewModal").style.display = "none";
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
    getReviews();
    registerEventListeners();

    if (!isLoggedIn) {
        // Hide or disable the "Add Review" button
        const addReviewButton = document.querySelector("#add-review-button");
        if (addReviewButton) {
            addReviewButton.disabled = true;
            addReviewButton.title = "Log in to add a review";
            addReviewButton.classList.add("disabled"); // Optional styling
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
    const review = {
        title: document.getElementById("reviewTitle").value.trim(),
        body: document.getElementById("reviewText").value.trim(),
        rating: parseInt(document.getElementById("reviewRating").value.trim(), 10),
    };

    // if (!validateReview(review)) return;

    try {
        console.log(storageId);
        const res = await fetch(`/reviews/${storageId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        });

        if (res.ok) {
            resetReviewForm();
            closeModal();
            await getReviews();
        } else {
            alert("Failed to submit review. Please try again");
        }
    } catch (err) {
        console.log(err);
    }
}

function resetReviewForm(){
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
        // You might want to display an error message to the user here
        document.getElementById('reviews-container').innerHTML =                               
            '<p>Error loading reviews. Please try again later.</p>';
    }
}

//replies
function registerEventListeners() {

    document.addEventListener("click", (event) => {
        
        const executeOnMatch = (selector, callback) => {
            if (event.target.matches(selector)) {
                callback(event.target);
            }
        };

        executeOnMatch(".read-more", expandReview);
        executeOnMatch(".review-image", expandImage);
        executeOnMatch(".reply-button", toggleReplyForm);
        executeOnMatch(".submit-reply", submitReply);
        executeOnMatch("#add-review-button", openModal);
        executeOnMatch(".close-modal-button", closeModal);
        executeOnMatch("#submit-review-button", submitReview);

    });

    document.addEventListener("DOMContentLoaded", updateReadMoreButton);
    window.addEventListener("resize", updateReadMoreButton);
}

function toggleReplyForm(button) {
    console.log(button)
    const form = button.nextElementSibling;
    // console.log(form);
    form.style.display = form.style.display == "none" ? "block" : "none";
}

async function submitReply(button) {
    if (!isLoggedIn) {
        alert("Please log in to reply to a review.");
        return;
    }

    const reviewDiv = button.closest(".review");
    const reviewId = reviewDiv.dataset.reviewId;
    const textarea = reviewDiv.querySelector("#reply-textarea");
    const replyText = textarea.value.trim();

    if (!replyText) {
        alert("Reply cannot be empty.");
        return;
    }
    try {
        const res = await fetch(`/replies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reviewId: parseInt(reviewId, 10), reply: replyText, storageId: storageId }),
        });

        if (res.ok) {
            // const newReplyHTML = await res.text();
            // console.log(newReplyHTML);
            // reviewDiv.querySelector(".replies").insertAdjacentHTML("beforeend", newReplyHTML);
            // textarea.value = "";
            reviewDiv.querySelector(".reply-form-container").style.display = "none";
            getReviews();
        } else {
            alert("Failed to submit reply.");
        }
    } catch (err) {
        console.error(err);
    }};