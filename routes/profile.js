// route uploadAvatar, changePassword, changeProfile from profileController
const express = require('express');
const {
    uploadAvatar,
    changePassword,
    changeProfile
} = require('../controllers/profileController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/uploadAvatar', auth, uploadAvatar)

router.post('/changePassword', auth, changePassword)

router.post('/changeProfile', auth, changeProfile)

module.exports = router;

