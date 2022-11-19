// route userView, orderView, createOrder from userController
const express = require('express');
const {
    userView,
    orderView,
    createOrder
} = require('../controllers/userController');
const router = express.Router();

router.get('/', userView);
router.get('/order', orderView);

router.post('/createOrder', createOrder)

module.exports = router;