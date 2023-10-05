const express = require('express')


const router = express.Router()


const adminAuthApi = require('../../controllers/admin/admin_auth')

router.post('/signup', adminAuthApi.adminRegistration)
router.post('/signin', adminAuthApi.adminLogin)
router.post('/forgotPassword', adminAuthApi.forgotPassword)
router.patch('/completePasswordReset', adminAuthApi.completePasswordReset)






module.exports = router;