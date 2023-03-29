const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const { signUp, login, remove, update } = require('../controllers/version 1.0/users');
const { getAllPosts, getFeeds } = require('../controllers/version 1.0/userPost');
const { getAllUserFriends } = require('../controllers/version 1.0/friends');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user');

/************************************* CONTROLLER VERSION 1.0 */
router.post('/signup', validate(userValidation.signup), signUp);
router.post('/login', login);
router.delete('/delete', userAuth, remove);
router.patch('/update', userAuth, update);

//User posts routes
router.get('/:userId/posts', getAllPosts);
router.get('/:userId/friends', getAllUserFriends);
router.get('/:userId/feeds', getFeeds);

/************************************* VERSION 2.0 */

module.exports = router
