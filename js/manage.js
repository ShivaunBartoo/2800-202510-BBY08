import { initImageUploadPreview } from './imageUploadUtil.js';

const storageId = window.location.pathname.split("/")[2];

localStorage.setItem('storageId', storageId);
if (!storageId) {
    console.error('No storage ID in URL');
}

document.addEventListener('DOMContentLoaded', function () {

    registerEventListeners();
    
    // Edit fridge name
    document.querySelector('.storage-title .edit-btn').addEventListener('click', () => {
        const nameEl = document.getElementById('storageName');
        const isEditable = nameEl.getAttribute('contenteditable') === 'true';
        nameEl.setAttribute('contenteditable', !isEditable);
        nameEl.focus();
    });

    initImageUploadPreview(
        'uploadTrigger',
        'coverPhotoInput',
        'photoPreview',
        'previewImage',
        (file) => {
            console.log('User selected file:', file);
        }
    );

    // Handle form submit
    document.querySelector('.man-save-btn').addEventListener('click', async () => {

        const coverPhotoInput = document.getElementById('coverPhotoInput');

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

            if (!response.ok) {
                throw new Error('Failed to save storage');
            }

            const result = await response.json();
            alert('Storage saved successfully!');
            console.log('client side', result);

            // Update preview image if new one was uploaded
            if (result.image) {
                document.getElementById('previewImage').src = result.image;
                document.getElementById('photoPreview').style.display = 'block';
            }

        } catch (err) {
            console.error('Save error:', err);
            alert('Error saving storage: ' + err.message);
        }
    });

    document.querySelector('.man-delete-btn').addEventListener('click', function () {

        document.getElementById('deleteModal').style.display = 'flex';

        document.getElementById('confirmDelete').addEventListener('click', function () {
            softDeleteStorage(storageId);
        });
    });
});

function registerEventListeners() {

    document.addEventListener("click", (event) => {
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

function toggleEdit(fieldId) {
    console.log(fieldId);
    const field = document.getElementById(fieldId);
    field.disabled = !field.disabled;

    // Special handling for select elements
    if (field.tagName === 'SELECT' && !field.disabled) {
        field.focus();
    } else if (!field.disabled) {
        field.focus();
    }
}

function toggleAddressEdit() {
    const fieldIds = ['street', 'city', 'province'];

    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.disabled = !field.disabled;
        }
    });
}

function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

async function softDeleteStorage(storageId) {
    try {
        const response = await fetch(`/manage/storage/soft-delete?storageId=${storageId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Storage archived successfully!');
            window.location.href = '/browse';
        } else {
            throw new Error('Failed to archive storage');
        }
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
}

