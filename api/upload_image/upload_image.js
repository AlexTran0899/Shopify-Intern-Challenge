const express = require('express');
const router = express.Router();
const upload = require('./fileupload');
const singleUpload = upload.single('image');
const Upload = require('./upload_image-model')
const restricted = require('../middleware/restricted')

router.post('/',restricted,  async (req, res) => {
  singleUpload(req, res, () => {
    if (req?.file?.key) {
      const data = {
        image_key: req.file.key,
        user_id: req.decodedJwt.subject,
        image_title: '',
        url: req.file.location
      }
      Upload.Add(data)
      .then(()=> res.json({ imageURL: req?.file?.location }))
    } else {
      res.status(400).json('failed to upload');
    }
  });
});

module.exports = router;