const express = require('express')
const router = express.Router()


const { userAuth } = require('../middlewares/auth')
const analyticsApi = require('../controllers/version 1.0/analytics')







router.get('/getDiamondAnalytics/:startingtime/:endingTime', userAuth, analyticsApi.getDiamondAnalytics)









module.exports = router