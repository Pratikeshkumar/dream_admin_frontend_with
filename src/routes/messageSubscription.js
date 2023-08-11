const express = require('express')
const router = express.Router()

const message_subscriptionApi = require('../controllers/version 1.0/message_subscription')
const { userAuth } = require('../middlewares/auth')

router.post('/getMessageSubscription', userAuth, message_subscriptionApi.getMessageSubscription)



module.exports = router