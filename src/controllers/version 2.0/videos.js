const { Video, Comment, Post } = require("../../models");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");
const logger = require("../../utils/logger");
const errorHandler = require("../../utils/apiError");

const createVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: CREATE VIDEO API CALLED");
  try {
    let {
      description,
      section,
      privacy_type,
      allow_comments,
      allow_duet,
      duet_video_id,
      duration,
    } = req.body,
      { path } = req.file,
      { id } = req.userData;

    if (!path) throw new errorHandler("image not present in body", "badRequest");

    const { url } = await cloudinary.uploads(path, "SocialMedia");

    fs.unlinkSync(path);

    let video = await Video.create({
      video: url,
      description,
      section,
      privacy_type,
      sound_id,
      allow_comments,
      allow_duet,
      duet_video_id,
      duration,
      user_id: id
    });
    video = JSON.parse(JSON.stringify(video));

    res.status(201).json({
      success: true,
      message: "Video posted successfully!",
      video: video
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const getVideos = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: GET SINGLE VIDEO API CALLED");
  try {
    let { videoId } = req.query,
      condition = {};

    videoId && (condition.id = videoId);

    const videos = await Video.findAll({
      condition,
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "created"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Videos fetched successfully",
      videos
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const getAllUserVideos = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: GET ALL User VIDEOS API CALLED");
  try {
    let { id } = req.userData;

    const videos = await Video.findAll({
      where: { user_id: id },
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "created"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched videos!",
      videos
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const updateVideo = (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: UPDATE VIDEO API CALLED");
  try {

  } catch (error) {

  }
};

const deleteVideo = async (req, res, next) => {
  logger.info("VIDEO: DELETE VIDEO API CALLED");
  try {
    let { id } = req.params;

    const video = await Video.destroy({
      where: { id },
    });

    if (!video) throw new errorHandler("Video not found!", "notFound");

    return res.status(200).json({
      success: true,
      message: "Video successfully deleted!"
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

module.exports = {
  createVideo,
  getVideos,
  updateVideo,
  getAllUserVideos,
  deleteVideo
};
