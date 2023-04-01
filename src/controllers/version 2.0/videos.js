const { Video, VideoComment, Post, Tag } = require("../../models");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");
const logger = require("../../utils/logger");
const errorHandler = require("../../utils/apiError");
const { Op } = require('sequelize');

const uploadVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: CREATE VIDEO API CALLED");
  try {
    let {
      mediaType, postedDateTime,
      commentsEnabled, cover, tags,
    } = req.body,
      { id } = req.userData,
      video = req.files.source ? req.files.source[0] : null,
      image = req.files.cover ? req.files.cover[0] : null,
      videoPath = video?.path, imagePath = image?.path;

    if (!videoPath || !imagePath) throw new errorHandler("data is not present in body", "badRequest");

    const uploadedVideo = await cloudinary.uploads(videoPath, "SocialMedia");
    const uploadedImage = await cloudinary.uploads(imagePath, "SocialMedia");

    let addVideo = await Video.create({
      mediaType, postedDateTime,
      commentsEnabled, cover: uploadedImage.url,
      video: uploadedVideo.url, user_id: id
    });
    addVideo = JSON.parse(JSON.stringify(addVideo));

    if (tags) {
      let allTags = tags.split(','),
        dbObjectForTags = [];

      for (let i = 0; i < allTags?.length; i++) {
        dbObjectForTags.push({
          video_id: addVideo.id,
          title: allTags[i]
        });
      }

    }
    let videoTags = await Tag.bulkCreate(dbObjectForTags);
    videoTags = JSON.parse(JSON.stringify(videoTags));

    res.status(201).json({
      success: true,
      message: "Video posted successfully!",
      payload: {
        ...video,
        tags: videoTags
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const allVideos = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: GET SINGLE VIDEO API CALLED");
  try {
    let { user_id } = req.userData;

    const videos = await Video.findAll({
      where: {
        user_id: {
          [Op.ne]: user_id
        }
      },
      include: [
        {
          model: VideoComment,
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

const getVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: GET SINGLE VIDEO API CALLED");
  try {
    let { video_id } = req.query,
      condition = {};

    video_id && (condition.id = video_id);

    const videos = await Video.findAll({
      where: condition,
      include: [
        {
          model: VideoComment,
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
          model: VideoComment,
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
  logger.info("VERSION 2.0 -> VIDEO: DELETE VIDEO API CALLED");
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

const likeVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: LIKE VIDEO API CALLED");
  try {
    let { id } = req.params;

    const video = await Video.destroy({
      where: { id },
    });

    if (!video) throw new errorHandler("Video not found!", "notFound");

    return res.status(200).json({
      success: true,
      message: "Liked video successfully!"
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const commentVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: COMMENT VIDEO API CALLED");
  try {
    let { id } = req.params;

    const video = await Video.destroy({
      where: { id },
    });

    if (!video) throw new errorHandler("Video not found!", "notFound");

    return res.status(200).json({
      success: true,
      message: "Commented on video successfully!"
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const replyComment = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: REPLY COMMENT VIDEO API CALLED");
  try {
    let { id } = req.params;

    const video = await Video.destroy({
      where: { id },
    });

    if (!video) throw new errorHandler("Video not found!", "notFound");

    return res.status(200).json({
      success: true,
      message: "Replied comment successfully!"
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

module.exports = {
  uploadVideo,
  allVideos,
  getVideo,
  updateVideo,
  getAllUserVideos,
  deleteVideo,
  likeVideo,
  commentVideo,
  replyComment,
};
