const express = require('express');
const router = express.Router();
const User = require('../../models/User')

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

module.exports = router;