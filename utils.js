// This script provides utility functions for working with Cloudinary image uploads.
// It includes a function to upload a photo buffer to Cloudinary, optionally replacing an old image.

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

/**
 * Uploads a photo buffer to Cloudinary.
 * If oldPublicId is provided, deletes the old image before uploading the new one.
 * Returns an object with the secure URL and public ID of the uploaded image.
 */
async function uploadPhotoCloud(fileBuffer, oldPublicId = null, folder = 'default_folder') {
    try {

        // If an old image public ID is provided, delete the old image from Cloudinary
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId);
        }

        // Upload the new image to Cloudinary using an upload stream
        const cloudResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }).end(fileBuffer);
        });

        // Return the secure URL and public ID of the uploaded image
        return {
            image: cloudResult.secure_url,
            imgPublicId: cloudResult.public_id
        };
    } catch (err) {
        throw new Error('Cloudinary upload failed: ' + err.message);
    }
}

module.exports = { uploadPhotoCloud };
