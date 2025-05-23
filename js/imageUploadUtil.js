/**
 * Initializes image upload preview on the client page functionality.
 */

export async function initImageUploadPreview(trigger, input, previewContainer, previewImage, onSelect) {

    // Convert selectors to elements if needed
    if (typeof trigger === 'string') trigger = document.querySelector(trigger);
    if (typeof input === 'string') input = document.querySelector(input);
    if (typeof previewContainer === 'string') previewContainer = document.querySelector(previewContainer);
    if (typeof previewImage === 'string') previewImage = document.querySelector(previewImage);

    // Ensure required elements exist
    if (!trigger || !input) {
        console.error(`Missing upload element(s): ${trigger}, ${input}`);
        return;
    }

    // When the trigger is clicked, open the file input dialog
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        input.click();
    });

    // When a file is selected, validate and preview it
    input.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Only allow image files
        if (!file.type.match('image.*')) {
            alert('Please select an image file (JPEG, PNG, etc.)');
            return;
        }

        // Limit file size to 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be less than 5MB');
            return;
        }

        // Read and preview the image
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
    
    document.querySelectorAll('.removeImageBtn').forEach(button =>{
    if (button != null) {
        button.addEventListener('click', () => {
            input.value = ''; // clear file input
            previewImage.src = '#'; // reset image src
            previewContainer.style.display = 'none'; // hide preview
            if (onSelect) onSelect(null); // optional: signal no image
        });
    }
    })
}

/**
 * Displays an error message in the error div.
 */
export function displayError(msg) {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
}

/**
 * Highlights form fields with errors by adding an error-input class.
 */
export function highlightErrorFields(fields) {
    // Clear previous error styles
    document.querySelectorAll('.error-input').forEach(el => {
        el.classList.remove('error-input');
    });

    fields.forEach(field => {
        // Try select by name
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            input.classList.add('error-input');
        } else {
            console.warn(`Field "${field}" not found in form`);
        }
    });
}