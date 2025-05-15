import { initImageUploadPreview } from './imageUploadUtil.js';

document.addEventListener('DOMContentLoaded', function () {

    registerEventListeners();

    initImageUploadPreview(
        'uploadTrigger',
        'coverPhotoInput',
        'photoPreview',
        'previewImage',
        (file) => {
            console.log('User selected file:', file);
        }
    );
    
    document.getElementById('newStorageForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const coverPhotoInput = document.getElementById('coverPhotoInput');

        const formData = new FormData(form);

        formData.set('storageType', parseInt(formData.get('storageType')));

        if (coverPhotoInput.files.length > 0) {
            formData.set('photo', coverPhotoInput.files[0]);
        }


        fetch(`/storage/createnew/`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(() => {

                alert('Storage created in database');
                window.location.href = '/browse';
            })

            .catch(error => {
                console.error('error', error);
                alert('Error: ' + error.message);
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

        executeOnMatch("#fridgeBtn", selectType,'fridge');
        executeOnMatch("#pantryBtn", selectType,'pantry');
        

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