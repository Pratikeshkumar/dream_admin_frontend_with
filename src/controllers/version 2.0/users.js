const { User } = require("../../models");
const fs = require('fs');
const errorHandler = require("../../utils/errorObject");
const { JWT_KEY } = process.env;
const logger = require('../../utils/logger');
const jwt = require("jsonwebtoken");
const cloudinary = require('../../config/cloudinary');

const signup = async (req, res, next) => {
  logger.info("VERSION 2.0 -> USER: SIGN UP API CALLED");
  try {
    let {
      user_name, email, firebase_uid,
      profile_image, bio,
      intro_video, id_type, id_number,
      language, avatar, country,
      countryCode, lat, lng, DOB, gender,
      id_attachement, secret_sign, id_verified,
    } = req.body;

    let user = await User.findOne({
      where: { email }
    });

    !language && (language = "EN");

    if (user) throw errorHandler("User already exists!", "duplication");

    let created_user = await User.create({
      user_name, email, firebase_uid, bio,
      lat, lng, DOB, countryCode,
      intro_video, id_type, id_number,
      language, avatar, country, gender,
      id_attachement, secret_sign, id_verified,
      role: "user", active: true, profile_image
    });
    created_user = JSON.parse(JSON.stringify(created_user));

    if (!created_user) throw errorHandler("Unexpected error occured while creating user!", "badRequest");

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      payload: {
        ...created_user,
        auth_token: jwt.sign({ user_id: created_user.id, email: created_user.email, firebase_uid: created_user.firebase_uid }, JWT_KEY),
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const login = async (req, res, next) => {
  logger.info("VERSION 2.0 -> USER: LOGIN UP API CALLED");
  try {
    let {
      email, firebase_uid, social_id
    } = req.body,
      condition = {
        email
      };

    firebase_uid && (condition.firebase_uid = firebase_uid);
    social_id && (condition.social_id = social_id);

    let user = await User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: condition
    });
    user = JSON.parse(JSON.stringify(user));

    if (!user) throw errorHandler("User not found!", "notFound");

    return res.status(201).json({
      success: true,
      message: "Logged-in successfully",
      payload: {
        ...user,
        auth_token: jwt.sign({ user_id: user.id, email: user.email, firebase_uid: user.firebase_uid }, JWT_KEY),
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const userInfo = async (req, res, next) => {
  logger.info("VERSION 2.0 -> USER: GET USER INFO API CALLED");
  try {
    let { id, email } = req.userData;

    let user = await User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: { id, email }
    });
    user = JSON.parse(JSON.stringify(user));

    if (!user) throw errorHandler("User not found", "notFound");

    return res.status(200).json({
      success: true,
      message: "User info fetched successfully!",
      payload: user
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const userInfoById = async (req, res, next) => {
  logger.info("VERSION 2.0 -> USER: GET OTHER USER INFO BY ID API CALLED");
  try {
    let { user_id } = req.params;

    let user = await User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: { id: user_id }
    });
    user = JSON.parse(JSON.stringify(user));

    if (!user) throw errorHandler("User not found", "notFound");

    return res.status(200).json({
      success: true,
      message: "User info fetched successfully!",
      payload: user
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  logger.info("VERSION 2.0 -> USER: USER UPDATE API CALLED");
  try {
    let data = req.body,
      { id, email } = req.userData;


    await User.update(
      data,
      { where: { id, email } }
    );

    let user = await User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        id, email
      }
    });
    user = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      success: true,
      message: "User info updated successfully!",
      payload: user
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const uploadData = async (req, res, next) => {
  logger.info("VERSION 2.0 -> USER: UPLOAD DATA API CALLED");
  try {
    let path = req?.files?.source[0]?.path;

    if (!path) throw errorHandler("data is not present in body", "badRequest");

    let uploadedVideo = await cloudinary.uploads(path, "SocialMedia"),
      url = uploadedVideo.url;

    fs.unlinkSync(path);

    res.status(201).json({
      success: true,
      message: "Data uploaded successfully!",
      payload: {
        url
      }
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

module.exports = {
  signup,
  login,
  updateUser,
  userInfo,
  userInfoById,
  uploadData
};
