
/**
 * Initializes image upload preview on the client page functionality.
 *
 * @param {string} triggerId - ID of the element that triggers the file input click
 * @param {string} inputId - ID of the hidden file input
 * @param {string} previewContainerId - ID of the container to show the preview
 * @param {string} previewImageId - ID of the img tag to show the preview image
 * @param {function} [onSelect] - Optional callback with the selected File object
 */

function initImageUploadPreview(triggerId, inputId, previewContainerId, previewImageId, onSelect) {
    
    const trigger = document.getElementById(triggerId);
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewContainerId);
    const previewImage = document.getElementById(previewImageId);

    if (!trigger || !input) {
        console.error(`Missing upload element(s): ${triggerId}, ${inputId}`);
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
}