const express = require('express');
const router = express.Router();

const admin = require("./admin");
const users = require("./users");
const videos = require("./videos");
const comments = require("./comments");
const likes = require("./likes");
const friends = require("./friends");
const country = require('./country');
const search = require('./search')
<<<<<<< HEAD
const analytics=require('./analytics')
=======
const message_subscription = require('./messageSubscription')
const analytics = require('./analytics')

>>>>>>> dcbe5c4f4310d3992ecb97bad45712ca68449a1b

router.use("/admin", admin);
router.use("/users", users);
router.use("/videos", videos);
router.use("/comments", comments);
router.use("/likes", likes);
router.use("/friends", friends);
router.use("/country", country)
router.use('/search', search)
<<<<<<< HEAD
router.use('/search', search)
router.use('/analytics',analytics)
=======
router.use('/message_subscription', message_subscription)
router.use('/analytics', analytics)

>>>>>>> dcbe5c4f4310d3992ecb97bad45712ca68449a1b
module.exports = router;