const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const Upload = require('./upload_image-model')
const restricted = require('../middleware/restricted')
const AWS = require('aws-sdk')
const fileUpload = require("express-fileupload");
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');

AWS.config.update({region:process.env.AWS_REGION})

const S3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})
const imageLabeling = async (url, next) => {
    const requests = {
        "requests": [{
            "image": { "source": { "imageUri": url } },
            "features": [
                {"type": "LABEL_DETECTION", "maxResults": 10}
            ]
        }]
    };

    try {
        const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`, requests);
        const labels = response.data.responses[0].labelAnnotations;

        if (!labels) {
            throw new Error('No labels found');
        }
        const tagString = labels.map(each => each.description).join();
        await Upload.addingTags(url, tagString);
    } catch (error) {
        next(error);
    }
};
const compressImage = async (imageData, fileExtension) => {
    return sharp(imageData)
        .resize(1000, 1000, { fit: sharp.fit.inside, withoutEnlargement: true })
        .toFormat(fileExtension)
        .webp({ quality: 95 })
        .toBuffer();
};

const createS3UploadParams = (imageData, bucket, fileExtension, mimeType) => ({
    Bucket: bucket,
    Key: `${uuidv4()}.${fileExtension}`,
    Body: imageData,
    ContentType: mimeType,
    ACL: 'public-read'
});

const addImageToDatabase = async (userId, compressedResult, originalResult) => {
    const imageData = {
        image_key: compressedResult.key,
        user_id: userId,
        image_title: '',
        url: compressedResult.Location,
        original_image: originalResult.Location
    };

    const data = await Upload.Add(imageData);
    if (!data[0].image_key || data[0].image_key.length === 0) {
        throw new Error('Error adding image to the database');
    }
    return data[0];
};

function getFileExtensionFromMimeType(mimeType) {
  const mimeTypes = {
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    // Add other MIME types if necessary
  };
  return mimeTypes[mimeType] || '';
}

router.post('/', restricted,
    fileUpload({ limits: { fileSize: 50 * 1024 * 1024 }}),
    async (req, res, next) => {
        try {
            const { image } = req.files;
            const { data: originalImageData, mimeType } = image;
            const fileExtension = getFileExtensionFromMimeType(mimeType)
            const bucket = process.env.AWS_BUCKET;

          const compressedImage = await compressImage(originalImageData, 'webp');
          const compressedResult = await uploadToS3(createS3UploadParams(compressedImage, bucket, 'webp', 'image/webp' ));

          const originalResult = await uploadToS3(createS3UploadParams(originalImageData, bucket, fileExtension, mimeType));
          const data = await addImageToDatabase(req.decodedJwt.subject, compressedResult, originalResult);

            await imageLabeling(compressedResult.Location, next);
            res.json(data);
        } catch (error) {
            next(error);
        }
});

async function uploadToS3(uploadParams) {
    return new Promise((resolve, reject) => {
        S3.upload(uploadParams, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


module.exports = router;