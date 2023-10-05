const express = require('express')

const router = express.Router()

const { adminAuth } = require('../../middlewares/auth')
const adminCountryApi = require('../../controllers/admin/admin_countries')

router.post('./addCountries', adminAuth, adminCountryApi.addCountries)
router.get('/addCountries/:page/:perPage', adminAuth, adminCountryApi.addCountries)
router.put('/updateCountries/:id', adminAuth, adminCountryApi.updateCountries)
router.delete('/deleteCountries/id', adminAuth, adminCountryApi.deleteCountries)



module.exports = router