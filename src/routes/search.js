const express = require('express')
const router = express.Router()

const {userAuth} = require('../middlewares/auth')
const searchApi = require('../controllers/version 2.0/search')


router.get('/searchUser/:text', searchApi.searchUser)





module.exports = router
