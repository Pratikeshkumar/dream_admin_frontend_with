const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mkv'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
    fields: 5
  },
  fileFilter: fileFilter
});

module.exports = upload;















// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./src/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fieldSize: 1024 * 1024 },
//   fileFilter: fileFilter,
// });

// module.exports = upload;
