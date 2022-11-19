// route to signupView and signupUser in signupController.
const express = require('express');
const {
    signupView,
    signupUser
} = require('../../controllers/auth/signupController');
const router = express.Router();

router.get('/', signupView);

router.post('/', signupUser);

module.exports = router;