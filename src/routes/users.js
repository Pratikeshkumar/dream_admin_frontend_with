const express = require('express');
const router = express.Router();

const { remove, update } = require('../controllers/version 1.0/users');
const { getAllPosts, getFeeds } = require('../controllers/version 1.0/userPost');
const { getAllUserFriends } = require('../controllers/version 1.0/friends');
const validate = require('../middlewares/validate');
const upload = require('../middlewares/uploadData');
const { userAuth } = require('../middlewares/auth');
const userApis2 = require('../controllers/version 2.0/users');
const userValidation = require('../validations/user');


/************************************* CONTROLLER VERSION 1.0 */
router.delete('/delete', userAuth, remove);
router.patch('/update', userAuth, update);

//User posts routes
router.get('/:userId/posts', getAllPosts);
router.get('/:userId/friends', getAllUserFriends);
router.get('/:userId/feeds', getFeeds);
router.get('/followersDetails/:user_id', validate(userValidation.userInfoById), userApis2.getFollowersDetails)
router.get('/followingsDetails/:user_id', validate(userValidation.userInfoById), userApis2.getFollowingsDetails)
router.get('/getAllFollowingsUsers', userAuth, userApis2.getAllFollowingsUsers)
router.get('/checkUsernameAvaliable/:value', userApis2.checkUsernameAvaliable)
router.get('/getLanguageAllLanguageList/:page_no/:page_size', userApis2.getLanguageAllLanguageList)
router.get('/searchLanguage/:search_text', userApis2.searchLanguage)
router.get('/getAllHobbiesList/:page_no/:page_size', userApis2.getAllHobbiesList)
router.get('/searchHobbies/:search_text', userApis2.searchHobbies)


/************************************* VERSION 2.0 */
router.post('/signup', userApis2.signup);
router.post('/login', userApis2.login);
router.put('/update', userAuth, validate(userValidation.updateUser), userApis2.updateUser);
router.get('/info', userAuth, userApis2.userInfo);
router.post('/userExist', userApis2.userExist)
router.post('/transaction', userAuth, userApis2.storePayments)
router.post('/gifts', userAuth, userApis2.sendGifts)
router.post('/follow', userAuth, userApis2.follow)
router.post('/unfollow', userAuth, userApis2.unfollow)
router.post('/addUserInteractionTime', userAuth, userApis2.addUserInteractionTime)
router.post('/changeProfilePicture', userAuth, upload.fields([{ name: 'images', maxCount: 1 }]), userApis2.changeProfilePicture)
router.post('/changeProfileVideo', userAuth, upload.fields([{ name: 'videos', maxCount: 1 }]), userApis2.changeProfileVideo)
router.post('/addView', userApis2.addView)
router.post('/addProfileVisit', userAuth, userApis2.addProfileVisit)



router.post('/upload', upload.fields([{ name: "source", maxCount: 1 }]), userApis2.uploadData);
router.get('/infoById/:user_id', validate(userValidation.userInfoById), userApis2.userInfoById);
router.get('/getAllMessages/:chatedPerson', userAuth, userApis2.getAllMessages)
router.get('/getMyAllChatedPerson', userAuth, userApis2.getMyAllChatedPerson)

/****************************** AVATAR */

router.get('/avatar', userApis2.getAvatar)


module.exports = router
