const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});
 
 
 async function uploadPhotoCloud(fileBuffer, oldPublicId = null, folder = 'default_folder') {
    try {
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId);
        }

        const cloudResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }).end(fileBuffer);
        });

        return {
            image: cloudResult.secure_url,
            imgPublicId: cloudResult.public_id
        };
    } catch (err) {
        throw new Error('Cloudinary upload failed: ' + err.message);
    }
}

module.exports = { uploadPhotoCloud };
