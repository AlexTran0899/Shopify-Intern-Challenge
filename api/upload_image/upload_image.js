const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const Upload = require('./upload_image-model')
const restricted = require('../middleware/restricted')
const AWS = require('aws-sdk')
const fileUpload = require("express-fileupload");
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const {ImageAnnotatorClient} = require('@google-cloud/vision').v1

AWS.config.update({region:process.env.AWS_REGION})

const S3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const GCP = new ImageAnnotatorClient({
    credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
    }
});

const imageLabeling = async (image_key, image_data, next) => {
    try {
        const [result] = await GCP.labelDetection(image_data);
        if (!result) {
            throw new Error('No labels found');
        }
        const tags = result.labelAnnotations.map(each => each.description).join();
        await Upload.addingTags(image_key, tags);
    } catch (error) {
        next(error);
    }
};
const compressImage = async (imageData, fileExtension) => {
    const buffer = await sharp(imageData)
        .resize(1000, 1000, { fit: sharp.fit.inside, withoutEnlargement: true })
        .toFormat(fileExtension)
        .webp({ quality: 95 })
        .toBuffer();

    const metadata = await sharp(buffer).metadata();
    return {
        buffer,
        width: metadata.width,
        height: metadata.height
    };
};

const createS3UploadParams = (imageData, bucket, fileExtension, mimeType) => ({
    Bucket: bucket,
    Key: `${uuidv4()}.${fileExtension}`,
    Body: imageData,
    ContentType: mimeType,
    ACL: 'public-read'
});

const addImageToDatabase = async (image_key, userId, compressedResult, originalResult, width, height) => {
    const imageData = {
        image_key: image_key,
        user_id: userId,
        image_title: '',
        url: compressedResult.Location,
        original_image: originalResult.Location,
        compressed_width: width,
        compressed_height: height
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
  };
  return mimeTypes[mimeType] || '';
}

router.post('/', restricted,
    fileUpload({ limits: { fileSize: 50 * 1024 * 1024 }}),
    async (req, res, next) => {
        try {
            const { image } = req.files;
            const { data: originalImageData, mimetype } = image;
            const fileExtension = getFileExtensionFromMimeType(mimetype)
            const bucket = process.env.AWS_BUCKET;
            const image_key = uuidv4()
            const { buffer: compressedImage, width, height } = await compressImage(originalImageData, 'webp');
            const compressedResult = await uploadToS3(createS3UploadParams(compressedImage, bucket, 'webp', 'image/webp' ));
            const originalResult = await uploadToS3(createS3UploadParams(originalImageData, bucket, fileExtension, mimetype));
            const data = await addImageToDatabase(image_key, req.decodedJwt.subject, compressedResult, originalResult, width, height);

            res.json(data);
            await imageLabeling(image_key, compressedImage, next); // usually takes around 7 to 14 second to process
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
