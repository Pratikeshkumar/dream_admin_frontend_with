const { Video, Comment, CommentReply, Tag, Like, User, Gift } = require("../../models");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");
const logger = require("../../utils/logger");
const errorHandler = require("../../utils/errorObject");
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { sq } = require('../../config/db');

const uploadVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: CREATE VIDEO API CALLED");
  try {
    let {
      mediaType, postedDateTime,
      commentsEnabled, tags, status
    } = req.body, dbObjectForTags = [],
      { id } = req.userData,
      video = req.files.source ? req.files.source[0] : null,
      image = req.files.cover ? req.files.cover[0] : null,
      videoPath = video?.path, imagePath = image?.path,
      promises = [], uploadedVideo, uploadedImage;

    if (!videoPath) throw errorHandler("data is not present in body", "badRequest");

    uploadedVideo = await cloudinary.uploads(videoPath, "SocialMedia");
    promises.push(fs.unlinkSync(videoPath));

    if (imagePath) {
      uploadedImage = await cloudinary.uploads(imagePath, "SocialMedia");
      promises.push(fs.unlinkSync(imagePath));
    }

    let addVideo = await Video.create({
      type: mediaType, postedDateTime,
      commentsEnabled, cover: uploadedImage?.url || null,
      video: uploadedVideo.url, user_id: id, status
    });
    addVideo = JSON.parse(JSON.stringify(addVideo));

    if (tags) {
      let allTags = tags.split(',');

      for (let i = 0; i < allTags?.length; i++) {
        dbObjectForTags.push({
          video_id: addVideo.id,
          title: allTags[i]
        });
      }

    }
    let videoTags = await Tag.bulkCreate(dbObjectForTags);
    videoTags = JSON.parse(JSON.stringify(videoTags));

    await Promise.all(promises);

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
    const videos = await Video.findAll({
      where: {
        status: "public"
      },
      include: [
        {
          as: "comments",
          model: Comment,
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
    let { video_id, user_id, status } = req.query,
      condition = {};

    video_id && (condition.id = video_id);
    user_id && (condition.user_id = user_id);
    status && (condition.status = status);

    const videos = await Video.findAll({
      where: condition,
      include: [
        {
          as: "comments",
          model: Comment,
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
  logger.info("VERSION 2.0 -> VIDEO: GET ALL USER VIDEOS API CALLED");
  try {
    let { id } = req.userData;

    const videos = await Video.findAll({
      where: { user_id: id },
      include: [
        {
          as: "comments",
          model: Comment,
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

const getUserPostedImages = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: GET ALL USER POSTED IMAGES API CALLED");
  try {
    let { status } = req.query,
      condition = {};

    condition.status = status;

    const videos = await Video.findAll({
      where: condition,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched images!",
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

    if (!video) throw errorHandler("Video not found!", "notFound");

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
    let { video_id } = req.params,
      { status } = req.body,
      user_id = req.userData.id,
      { like_id } = req.query,
      dbPayload = {
        video_id,
        user_id,
        status
      };

    like_id && (dbPayload.id = like_id);

    let liked = await Like.upsert(dbPayload);
    liked = JSON.parse(JSON.stringify(liked));

    if (!liked) throw errorHandler("Unexpected error occured while liking video!", "notFound");

    let totalVideoLikes = await Like.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_likes'],
      ],
      where: { id: video_id },
      group: ['video_id']
    });
    totalVideoLikes = JSON.parse(JSON.stringify(totalVideoLikes));

    return res.status(200).json({
      success: true,
      message: "Liked video successfully!",
      payload: {
        liked,
        totalVideoLikes: totalVideoLikes[0]?.total_likes
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const commentVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: COMMENT VIDEO API CALLED");
  try {
    let { video_id } = req.params,
      { comment } = req.body,
      user_id = req.userData.id;

    let commented = await Comment.create({
      video_id, comment, user_id
    });
    commented = JSON.parse(JSON.stringify(commented));

    if (!commented) throw errorHandler("Unexpected error occured while commenting on video!", "notFound");

    let totalComments = await Comment.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_comments']
      ],
      where: { video_id },
      group: ['video_id'],
      distinct: true
    });
    totalComments = JSON.parse(JSON.stringify(totalComments));

    return res.status(200).json({
      success: true,
      message: "Commented on video successfully!",
      payload: {
        comment: commented,
        totalComments: totalComments[0]?.total_comments
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const replyComment = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: REPLY COMMENT VIDEO API CALLED");
  try {
    let { comment_id } = req.params,
      { reply } = req.body,
      user_id = req.userData.id;

    let replied = await CommentReply.create({
      comment_id, reply, user_id
    });
    replied = JSON.parse(JSON.stringify(replied));

    if (!replied) throw errorHandler("Unexpected error occured while replying comment on video!", "notFound");

    let totalComments = await Comment.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_comments']
      ],
      where: { video_id },
      group: ['video_id'],
      distinct: true
    });
    totalComments = JSON.parse(JSON.stringify(totalComments));

    return res.status(200).json({
      success: true,
      message: "Commented on video successfully!",
      payload: {
        reply: replied,
        totalComments: totalComments[0]
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const userInvolvedVideos = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: USER INVOLVED VIDEOS API CALLED");
  try {
    let user_id = req.userData.id;

    let userLikedVideos = await Video.findAll({
      attributes: ['id', 'video'],
      where: { user_id },
      include: [
        {
          required: true,
          model: Like,
          as: "likes"
        },
      ]
    });
    let userCommentedVideos = await Video.findAll({
      attributes: ['id', 'video'],
      where: { user_id },
      include: [
        {
          required: true,
          model: Comment,
          as: "comments"
        },
      ]
    });
    userLikedVideos = JSON.parse(JSON.stringify(userLikedVideos));
    userCommentedVideos = JSON.parse(JSON.stringify(userCommentedVideos));


    return res.status(200).json({
      success: true,
      message: "User Involved videos fetched successfully!",
      payload: {
        ...userLikedVideos,
        ...userCommentedVideos
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const allComments = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: VIDEO ALL COMMENTS API CALLED");
  try {
    let { video_id } = req.params;

    let videoComments = await Video.findOne({
      attributes: ['id', 'video'],
      where: { id: video_id },
      include: [
        {
          model: Comment,
          as: "comments",
          include: {
            model: User,
            as: "user"
          }
        },
      ]
    });
    videoComments = JSON.parse(JSON.stringify(videoComments));

    let totalComments = await Comment.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_comments']
      ],
      where: { video_id },
      group: ['video_id'],
      distinct: true
    });
    totalComments = JSON.parse(JSON.stringify(totalComments));
    videoComments.totalComments = totalComments[0].total_comments;


    return res.status(200).json({
      success: true,
      message: "Video all comments fetched successfully!",
      payload: videoComments
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const giftVideo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> VIDEO: GIFT VIDEO API CALLED");
  let transaction = await sq.transaction();
  try {
    let data = req.body,
      {
        to_video_id, num_of_diamonds
      } = data,
      reciever_id = data.to_user_id,
      sender_id = req.userData.id,
      user_diamonds = req.userData.diamonds;

    if (num_of_diamonds >= user_diamonds) throw errorHandler("You don't have enough diamonds!", "badRequest");

    let gift = await Gift.create({
      sender_id, reciever_id, video_id: to_video_id, diamonds: num_of_diamonds
    }, { transaction });
    gift = JSON.parse(JSON.stringify(gift));

    if (!gift) throw errorHandler("Unexpected error occured giving diamonds to video!", "badRequest");

    let user = await User.findOne({ where: { id: sender_id } }, { transaction });
    user.diamonds = user.diamonds - num_of_diamonds;
    user.save();

    let total_diamonds_gifted_to_video = await Gift.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('diamonds')), 'total_diamonds_gifted_to_video']
      ],
      where: { video_id: to_video_id },
      group: ['video_id']
    }, { transaction });
    total_diamonds_gifted_to_video = JSON.parse(JSON.stringify(total_diamonds_gifted_to_video));

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Gifted diamonds successfully!",
      payload: {
        video_id: to_video_id,
        diamonds_gifted: num_of_diamonds,
        total_diamonds_gifted_to_video:
          parseInt(total_diamonds_gifted_to_video[0].total_diamonds_gifted_to_video) + parseInt(num_of_diamonds),
      }
    });
  } catch (error) {
    logger.error(error);
    await transaction.rollback();
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
  userInvolvedVideos,
  allComments,
  giftVideo,
  getUserPostedImages
};
