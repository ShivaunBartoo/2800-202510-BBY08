import { initImageUploadPreview, displayError, highlightErrorFields } from './imageUploadUtil.js';

document.addEventListener('DOMContentLoaded', function () {

    registerEventListeners();

    initImageUploadPreview(
        '.uploadTrigger',
        '.coverPhotoInput',
        '.photoPreview',
        '.previewImage',
        (file) => {
            console.log('User selected file:', file);
        }
    );

    document.getElementById('newStorageForm').addEventListener('submit', (e) => {
        e.preventDefault();


        const form = e.target;
        const coverPhotoInput = document.querySelector('.coverPhotoInput');

        const formData = new FormData(form);

        formData.set('storageType', parseInt(formData.get('storageType')));

        if (coverPhotoInput.files.length > 0) {
            formData.set('photo', coverPhotoInput.files[0]);
        }

        fetch(`/storage/createnew/`, {
            method: 'POST',
            body: formData
        })
            .then(async res => {
                const data = await res.json();

                if (!res.ok) {

                    displayError(data.error);

                    console.log(data.fields);
                    if (Array.isArray(data.fields)) {
                        highlightErrorFields(data.fields);
                    }

                    throw new Error(data.error);
                }

                window.location.href = '/profile';
            })
            .catch(error => {
                console.error('Submission error:', error);
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

        executeOnMatch("#fridgeBtn", selectType, 'fridge');
        executeOnMatch("#pantryBtn", selectType, 'pantry');
        executeOnMatch(".cre-back-btn", () => {
            window.location.href = '/profile';
        });
    });
}

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