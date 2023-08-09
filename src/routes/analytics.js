<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/auth');
const analyticsApi = require('../controllers/version 1.0/analytics')

/************************************* CONTROLLER VERSION 1.0 */
router.get('/getDiamondAnalytics/:startingtime/:endingtime',userAuth,analyticsApi.getDiamondAnalytics);

module.exports = router
=======
const express = require('express')
const router = express.Router()


const { userAuth } = require('../middlewares/auth')
const analyticsApi = require('../controllers/version 1.0/analytics')







router.get('/getDiamondAnalytics/:startingtime/:endingTime', userAuth, analyticsApi.getDiamondAnalytics)









module.exports = router
>>>>>>> dcbe5c4f4310d3992ecb97bad45712ca68449a1b
