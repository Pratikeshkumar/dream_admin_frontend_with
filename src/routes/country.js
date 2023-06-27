const express = require('express')
const router = express.Router()


const {getAllcountries, getCitiesbyCode} = require('../controllers/version 2.0/country')

router.get('/allCountry', getAllcountries)
router.get('/getCitiesByCode', getCitiesbyCode)

module.exports = router