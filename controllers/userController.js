const userView = (req, res) => {
    res.render('user', {});
}

const orderView = (req, res) => {
    res.render('order', {})
}

const createOrder = (req, res) => {
    console.log('req_order', req.body);
    res.send(req.body);
}

module.exports = {
    userView,
    orderView,
    createOrder
}