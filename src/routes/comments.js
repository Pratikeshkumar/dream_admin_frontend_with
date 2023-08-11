const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const commentApi = require('../controllers/version 1.0/comments')

/************************************* CONTROLLER VERSION 1.0 */

router.get('/fetchComment/:postId', commentApi.fetchComment)
router.post('/createComment', userAuth, commentApi.createComment)
router.post('/replyComment', userAuth, commentApi.replyComment)
router.post('/likeComment', userAuth, commentApi.likeComment)
router.post('/unlikeComment', userAuth, commentApi.unlikeComment)
router.put('/editComment', userAuth, commentApi.editComment)
router.delete('/deleteComment', userAuth, commentApi.deleteComment)



module.exports = router
