const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const likeApi1 = require('../controllers/version 1.0/likes');

/************************************* CONTROLLER VERSION 1.0 */
router.post('/video_like', userAuth, likeApi1.addLike)

module.exports = router
