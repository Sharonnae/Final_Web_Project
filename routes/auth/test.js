const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const Order = require('../../models/Appointment')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json({
        users: users
    })
});

router.get('/delete/:id', async (req, res) => {
    const {id} = req.params
    await User.deleteOne({ _id: id })
})

router.get('/order', async (req, res) => {
    const orders = await Order.find()
    res.json({
        users: orders
    })
});

router.get('/order/delete/:id', async (req, res) => {
    const {id} = req.params
    await Order.deleteOne({ _id: id })
})

module.exports = router;