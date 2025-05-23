// This script manages the "manage storage" page for editing or deleting a fridge/pantry.
// It handles form submission, image upload preview, error display, field editing toggles, and soft deletion.

import { initImageUploadPreview, displayError, highlightErrorFields } from './imageUploadUtil.js';

const storageId = window.location.pathname.split("/")[2];

localStorage.setItem('storageId', storageId);
if (!storageId) {
    console.error('No storage ID in URL');
}

document.addEventListener('DOMContentLoaded', function () {

    registerEventListeners();

    // Enables editing of the fridge/pantry name when the edit button is clicked
    document.querySelector('.storage-title .edit-btn').addEventListener('click', () => {
        const nameEl = document.getElementById('storageName');
        const isEditable = nameEl.getAttribute('contenteditable') === 'true';
        nameEl.setAttribute('contenteditable', !isEditable);
        nameEl.focus();
    });

    // Initializes image upload preview for the cover photo
    initImageUploadPreview(
        '.uploadTrigger',
        '.coverPhotoInput',
        '.photoPreview',
        '.previewImage'
    );

    // Handles the save button click for updating storage details
    document.querySelector('.man-save-btn').addEventListener('click', async () => {

        const submitBtn = document.querySelector('.man-save-btn');
        submitBtn.disabled = true;
        const coverPhotoInput = document.querySelector('.coverPhotoInput');

        const formData = new FormData();

        formData.append('title', document.getElementById('storageName').textContent.trim());
        formData.append('street', document.getElementById('street').value.trim());
        formData.append('city', document.getElementById('city').value.trim());
        formData.append('province', document.getElementById('province').value.trim());
        formData.append('storageType', document.getElementById('storageTypeSelect').value);
        formData.append('lastCleaned', document.getElementById('lastCleaned').value.trim());
        formData.append('description', document.getElementById('description').value.trim());
        // Append photo only if user selected one
        if (coverPhotoInput.files.length > 0) {
            formData.append('photo', coverPhotoInput.files[0]);
        }

        try {
            const response = await fetch(`/manage/storage?storageId=${storageId}`, {
                method: 'PUT',
                body: formData
            });
            const result = await response.json();

            if (!response.ok) {
                displayError(result.error);

                if (Array.isArray(result.fields)) {
                    highlightErrorFields(result.fields);
                }
                throw new Error('Failed to save storage');
            }

            displayError('Storage saved successfully!');

            // Update preview image if new one was uploaded
            if (result.image) {
                document.querySelector('.previewImage').src = result.image;
                document.querySelector('.photoPreview').style.display = 'block';
            }
            submitBtn.disabled = false;

        } catch (err) {
            console.error('Save error:', err);
            submitBtn.disabled = false;

        }
    });

    // Handles the delete button click to show the delete confirmation modal
    document.querySelector('.man-delete-btn').addEventListener('click', function () {

        document.getElementById('deleteModal').style.display = 'flex';

        document.getElementById('confirmDelete').addEventListener('click', function () {
            softDeleteStorage(storageId);
        });
    });
});

/**
 * Registers event listeners for edit buttons and modal controls.
 * Handles toggling of edit mode for various fields and closing modals.
 */
function registerEventListeners() {

    document.addEventListener("click", (event) => {
        // Utility to execute a callback if the event target matches a selector
        const executeOnMatch = (selector, callback, arg) => {
            if (event.target.closest(selector)) {
                callback(arg);
            }
        };

        executeOnMatch("#description-btn", toggleEdit, 'description');
        executeOnMatch("#address-btn", toggleAddressEdit);
        executeOnMatch("#type-btn", toggleEdit, 'storageTypeSelect');
        executeOnMatch("#clean-btn", toggleEdit, 'lastCleaned');
        executeOnMatch(".cancel-btn", closeModal);

    });

}

/**
 * Toggles the disabled state of a single editable field.
 * Focuses the field if it becomes enabled.
 */
function toggleEdit(fieldId) {
    const field = document.getElementById(fieldId);
    field.disabled = !field.disabled;

    // Special handling for select elements
    if (field.tagName === 'SELECT' && !field.disabled) {
        field.focus();
    } else if (!field.disabled) {
        field.focus();
    }
}

/**
 * Toggles the disabled state of the address fields (street, city, province).
 */
function toggleAddressEdit() {
    const fieldIds = ['street', 'city', 'province'];

    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.disabled = !field.disabled;
        }
    });
}

/**
 * Closes the delete confirmation modal.
 */
function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

/**
 * Sends a DELETE request to soft-delete (archive) the storage location.
 * Redirects to /browse on success, or displays an error on failure.
 */
async function softDeleteStorage(storageId) {
    try {
        const response = await fetch(`/manage/storage/soft-delete?storageId=${storageId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.href = '/browse';
        } else {
            throw new Error('Failed to archive storage');
        }
    } catch (error) {
        console.error(error);
        displayError('Error: ' + error.message);
    }
}

