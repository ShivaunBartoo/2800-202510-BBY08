
/**
 * Initializes image upload preview on the client page functionality.
 *
 * @param {string} triggerId - ID of the element that triggers the file input click
 * @param {string} inputId - ID of the hidden file input
 * @param {string} previewContainerId - ID of the container to show the preview
 * @param {string} previewImageId - ID of the img tag to show the preview image
 * @param {function} [onSelect] - Optional callback with the selected File object
 */

export async function initImageUploadPreview(trigger, input, previewContainer, previewImage, onSelect) {

    // const trigger = document.querySelector(triggerId);
    // const input = document.querySelector(inputId);
    // const previewContainer = document.querySelector(previewContainerId);
    // const previewImage = document.querySelector(previewImageId);

    if (typeof trigger === 'string') trigger = document.querySelector(trigger);
    if (typeof input === 'string') input = document.querySelector(input);
    if (typeof previewContainer === 'string') previewContainer = document.querySelector(previewContainer);
    if (typeof previewImage === 'string') previewImage = document.querySelector(previewImage);

    
    if (!trigger || !input) {
        console.error(`Missing upload element(s): ${trigger}, ${input}`);
        return;
    }

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        input.click();
    });

    input.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            alert('Please select an image file (JPEG, PNG, etc.)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'block';
                if (onSelect) onSelect(file);
            }
        };
        reader.readAsDataURL(file);
    });
    
    const removeImageBtn = document.querySelector('.removeImageBtn');
    console.log(removeImageBtn);
    if (removeImageBtn != null) {
        removeImageBtn.addEventListener('click', () => {
            input.value = ''; // clear file input
            previewImage.src = '#'; // reset image src
            previewContainer.style.display = 'none'; // hide preview
            if (onSelect) onSelect(null); // optional: signal no image
        });
    }
}

export function displayError(msg) {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
}