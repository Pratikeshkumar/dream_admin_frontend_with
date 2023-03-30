const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const { login, remove, update } = require('../controllers/version 1.0/users');
const { getAllPosts, getFeeds } = require('../controllers/version 1.0/userPost');
const { getAllUserFriends } = require('../controllers/version 1.0/friends');
const userApis2 = require('../controllers/version 2.0/users');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user');

/************************************* CONTROLLER VERSION 1.0 */
router.delete('/delete', userAuth, remove);
router.patch('/update', userAuth, update);

//User posts routes
router.get('/:userId/posts', getAllPosts);
router.get('/:userId/friends', getAllUserFriends);
router.get('/:userId/feeds', getFeeds);

/************************************* VERSION 2.0 */
router.post('/signup', validate(userValidation.signup), userApis2.signup);
router.post('/login', validate(userValidation.login), userApis2.login);
router.post('/update', userAuth, validate(userValidation.updateUser), userApis2.login);
router.get('/info', userAuth, userApis2.userInfo);

module.exports = router
