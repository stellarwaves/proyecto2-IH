'use strict'
// config/ cloudinary.js

const multer = require('multer')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: 'davidcidcloud',
  api_key: '674839948569481',
  api_secret: 'K-M2AlEHu1obg4996jYGXGGgfbE'
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'proyectM2', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png']
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  // }
})

const uploadCloud = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true
      return cb(null, false, new Error('Wrong file type uploaded'))
    }
    cb(null, true)
  }
})

module.exports = uploadCloud
