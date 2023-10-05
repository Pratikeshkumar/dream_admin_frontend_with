const express = require('express')

const router = express.Router()


const admin_auth = require('./admin_auth')
const admin_language = require('./admin_langauge')
const admin_occupations = require('./admin_occupations')
const admin_hobbies = require('./admin_hobbies')


router.use('/auth', admin_auth)
router.use('/language', admin_language)
router.use('/occupation', admin_occupations)
router.use('/hobbies', admin_hobbies)







module.exports = router;