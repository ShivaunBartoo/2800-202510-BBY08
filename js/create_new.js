// This script manages the "create new storage" page for adding a new fridge or pantry.
// It handles form submission, image upload preview, error display, and storage type selection.

import { initImageUploadPreview, displayError, highlightErrorFields } from './imageUploadUtil.js';

// Waits for the DOM to load before initializing event listeners and image upload preview.
document.addEventListener('DOMContentLoaded', function () {

    registerEventListeners();

    // Initializes the image upload preview functionality for the cover photo.
    initImageUploadPreview(
        '.uploadTrigger',
        '.coverPhotoInput',
        '.photoPreview',
        '.previewImage'
    );

    // Handles the form submission for creating a new storage location.
    document.getElementById('newStorageForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.querySelector('.cre-save-btn');
        submitBtn.disabled = true;
        const form = e.target;
        const coverPhotoInput = document.querySelector('.coverPhotoInput');

        const formData = new FormData(form);

        // Ensure storageType is an integer for backend validation.
        formData.set('storageType', parseInt(formData.get('storageType')));

        // If a cover photo is selected, add it to the form data.
        if (coverPhotoInput.files.length > 0) {
            formData.set('photo', coverPhotoInput.files[0]);
        }

        // Submit the form data to the server to create the new storage.
        fetch(`/storage/createnew/`, {
            method: 'POST',
            body: formData
        })
            .then(async res => {
                const data = await res.json();

                if (!res.ok) {
                    // Display error message and highlight fields if validation fails.
                    displayError(data.error);
                    
                    if (Array.isArray(data.fields)) {
                        highlightErrorFields(data.fields);
                    }

                    throw new Error(data.error);
                }
                submitBtn.disabled = false;
                window.location.href = '/profile';
            })
            .catch(error => {
                console.error('Submission error:', error);
                submitBtn.disabled = false;
            });
    });
});

/**
 * Registers event listeners for storage type selection and navigation buttons.
 * Handles fridge/pantry type selection and back button navigation.
 */
function registerEventListeners() {

    document.addEventListener("click", (event) => {
        // Utility to execute a callback if the event target matches a selector.
        const executeOnMatch = (selector, callback, arg) => {
            if (event.target.closest(selector)) {
                callback(arg);
            }
        };

        executeOnMatch("#fridgeBtn", selectType, 'fridge');
        executeOnMatch("#pantryBtn", selectType, 'pantry');
        executeOnMatch(".cre-back-btn", () => {
            window.location.href = '/profile';
        });
    });
}

/**
 * Handles the selection of storage type (fridge or pantry).
 * Updates the UI and sets the hidden input value accordingly.
 */
function selectType(type) {
    const fridgeBtn = document.getElementById('fridgeBtn');
    const pantryBtn = document.getElementById('pantryBtn');
    const storageTypeInput = document.getElementById('storageType')

    if (type === 'fridge') {
        fridgeBtn.classList.add('active');
        pantryBtn.classList.remove('active');
        storageTypeInput.value = 1;
    } else {
        pantryBtn.classList.add('active');
        fridgeBtn.classList.remove('active');
        storageTypeInput.value = 2;
    }
}