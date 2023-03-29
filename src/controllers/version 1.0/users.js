const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const logger = require('../../utils/logger')
const { JWT_KEY } = process.env;

const signUp = async (req, res, next) => {
  logger.info("USER: SIGN UP API CALLED");
  try {
    const {
      email, first_name, last_name,
      password, profileUrl
    } = req.body;

    if (email && first_name && last_name && password) {

      if (validator.validate(email)) {
        let check = await User.findOne({
          where: { email: email },
          attributes: ["email"],
        });


        if (check !== null) {
          res.status(409).json({ response: "user already exist" });
        } else {
          let createUser = await User.create({
            email,
            first_name,
            last_name,
            password: await bcrypt.hash(password, 10),
            role: "user",
            active: true,
            profileUrl
          });

          if (createUser) {
            res.status(201).json({ response: "user created successfully" });
          }

        }

      } else {
        res.status(401).json({ response: "email is not valid" });
      }

    } else {

      res.status(401).json({ response: "one or more values is missing" });

    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ response: "an error occured" });
  }
};

const login = async (req, res, next) => {
  logger.info("USER: LOGIN API CALLED");
  try {
    const { email, password } = req.body;
    if (email && password) {
      if (validator.validate(email)) {
        let check = await User.findOne({
          where: { email: email },
          attributes: ["email", "password"],
        });
        if (check !== null) {
          let comparePassword = await bcrypt.compare(password, check.password);
          if (comparePassword) {
            res.status(200).json({
              response: "Auth successful",
              token: jwt.sign({ email: check.email }, JWT_KEY),
            });
          } else {
            res.status(401).json({ response: "Auth failed" });
          }
        } else {
          res.status(404).json({ response: "user not found" });
        }
      } else {
        res.status(422).json({ response: "not a valid email" });
      }
    } else {
      res.status(422).json({ response: "one or more values are missing" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ response: "An error occured" });
  }
};

const remove = async (req, res, next) => {
  logger.info("USER: REMOVE API CALLED");
  try {
    await User.destroy({ where: { id: req.userData.id } });
    res.status(200).json({ response: "user deleted sucessfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const update = async (req, res, next) => {
  logger.info("USER: UPDATE API CALLED");
  try {
    const updatedUser = await User.update(
      { ...req.body },
      { where: { id: req.userData.id } }
    );
    res.status(200).json({ message: "update successful" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "An error occured" });
  }
};

module.exports = {
  signUp,
  login,
  remove,
  update,
};
