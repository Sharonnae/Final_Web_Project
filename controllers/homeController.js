// return (render) home.ejs as 'homeView' object.
const homeView = (req, res) => {
    res.render('home', {
    });
}

module.exports = {
    homeView
}