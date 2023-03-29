const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");
const upload = require("../utils/imageUpload");
const videoApis2 = require('../controllers/version 2.0/videos');
const validate = require('../middlewares/validate');
const videoValidation = require('../validations/video');

/************************************* CONTROLLER VERSION 2.0 */
router.post("/video", userAuth, upload.single("postVideo"), validate(videoValidation.createVideo), videoApis2.createVideo);
router.get("/userAllVideos", userAuth, videoApis2.getAllUserVideos);
router.get("/video", userAuth, validate(videoValidation.getVideos), videoApis2.getVideos);
router.patch("/video/:videoId", userAuth, validate(videoValidation.updateVideo), videoApis2.updateVideo);
router.delete("/video", userAuth, validate(videoValidation.deleteVideo), videoApis2.deleteVideo);


module.exports = router;
