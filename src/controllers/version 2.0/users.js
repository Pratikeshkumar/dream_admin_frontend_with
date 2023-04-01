const { User } = require("../../models");
const logger = require('../../utils/logger');
const errorHandler = require("../../utils/errorObject");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const signup = async (req, res, next) => {
  logger.info("VERSION 2.0 -> USER: SIGN UP API CALLED");
  try {
    let {
      user_name, email, firebase_uid,
      token, profile_image, bio,
      intro_video, id_type, id_number,
      language, avatar, country,
      countryCode, lat, lng, DOB, gender,
      id_attachement, secret_sign, id_verified,
    } = req.body;

    let user = await User.findOne({
      where: { firebase_uid }
    });

    !language && (language = "EN");

    if (user) throw new errorHandler("User already exists!", "duplication");

    let createUser = await User.create({
      user_name, email, firebase_uid, bio,
      token, lat, lng, DOB, countryCode,
      intro_video, id_type, id_number,
      language, avatar, country, gender,
      id_attachement, secret_sign, id_verified,
      role: "user", active: true, profile_image
    });

    if (!createUser) throw new errorHandler("Unexpected error occured while creating user!", "badRequest");

    return res.status(201).json({
      success: true,
      message: "user created successfully"
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
      email, firebase_uid, token,
    } = req.body,
      condition = {
        firebase_uid, token,
      };

    email && (condition.email = email);

    let user = await User.findOne({
      attributes: {
        exclude: ['first_name', 'last_name', 'password']
      },
      where: condition
    });
    user = JSON.parse(JSON.stringify(user));

    if (!user) throw new errorHandler("User not found!", "notFound");

    return res.status(201).json({
      success: true,
      message: "Logged-in successfully",
      payload: {
        ...user,
        auth_token: jwt.sign({ user_id: user.id, firebase_uid: user.firebase_uid, token: user.token }, JWT_KEY),
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
    let { firebase_uid, token } = req.userData;

    let user = await User.findOne({
      attributes: {
        exclude: ['first_name', 'last_name', 'password']
      },
      where: { firebase_uid, token }
    });
    user = JSON.parse(JSON.stringify(user));

    if (!user) throw new errorHandler("User not found", "notFound");

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
      { firebase_uid, token } = req.userData;

    let updatedUser = await User.update(
      data,
      { where: { firebase_uid, token } }
    );

    if (updatedUser[0] !== 1) throw new errorHandler("Unexpected error occured while updating user info", "badRequest");

    let user = await User.findOne({
      attributes: {
        exclude: ['first_name', 'last_name', 'password']
      },
      where: {
        firebase_uid, token
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


module.exports = {
  signup,
  login,
  updateUser,
  userInfo
};
