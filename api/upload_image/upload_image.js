const express = require('express');
const router = express.Router();
// const upload = require('./fileupload');
// const singleUpload = upload.single('image');
const Upload = require('./upload_image-model')
const image = require('../Image/image-model')
const restricted = require('../middleware/restricted')
const AWS = require('aws-sdk')
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require('uuid');

AWS.config.update({region:process.env.AWS_REGION})

const S3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})
async function imageLabeling(url) {
  let data = null
  let word = []
  const requests =
  {
    "requests": [{
      "image": { "source": { "imageUri": url } },
      "features": [
        {
          "type": "LABEL_DETECTION",
          "maxResults": 10
        }
      ]
    }
    ]
  }
  axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`, requests)
    .then(res => data = res.data.responses[0])
    .then(() => data.labelAnnotations.map(each => word.push(each.description)))
    .then(() => word = word.join())
    .then(() => Upload.addingTags(url, word))
      .catch(() => console.log("error in image labeling"))
}

router.post('/', restricted, fileUpload({
  limits: { fileSize: 2 * 1024 * 1024 }}),
    async ( req, res,next) => {
      const image = req.files.image
      const fileExtension = image.name.split('.').pop();
      const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${uuidv4()}.${fileExtension}`,
      Body: Buffer.from(image.data),
      ContentType: image.mimeType,
      ACL: 'public-read'
  }
  S3.upload(uploadParams, (err,data) => {
    err && console.log('err',err)
    data && console.log('data',data.Location)
  })
});

router.put('/original_image/:image_key', restricted, (req, res,next) => {
  // const image_key = req.params.image_key;
  // const user_id = req.decodedJwt.subject;
  //
  // singleUpload(req, res, (err) => {
  //   if (err) {
  //     console.log("in the error")
  //     image.deleteOneImage(user_id,image_key)
  //         .then()
  //         .catch(err => console.log(err))
  //     return next(err)
  //   }
  //   if (!req.file) {
  //     image.deleteOneImage(user_id,image_key)
  //         .then()
  //         .catch(err => console.log(err))
  //     return res.status(400).json({ message: 'No file uploaded' });
  //   }
  //
  //   Upload.updateOriginalImage(user_id, image_key, req.file.location)
  //       .then(data => res.json(data))
  //       .catch(err => {
  //         next(err)
  //       });
  // });
});


module.exports = router;