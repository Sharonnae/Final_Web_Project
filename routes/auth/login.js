// route to loginView and loginUser from loginController.
const express = require('express');
const {
    loginView,
    loginUser
} = require('../../controllers/auth/loginController');
const router = express.Router();

router.get('/', loginView);

router.post('/', loginUser);

module.exports = router;