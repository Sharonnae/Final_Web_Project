const Twitter = require('twitter') //to aceess twitter api

// connect to twitter api using credenticals from .env and render medicalNews.ejs with @mnt info and data.
const newsView = async (req, res) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_KEY_SECRET,
        access_token_key: process.env.TWITTER_API_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
    });

    // get medical updates from twitter page "@mnt"
    const medical = await client.get('statuses/user_timeline', {
        screen_name: "mnt"
    });
    // get "@mnt" user info from twitter
    const userData = await client.get('users/show.json', {
        screen_name: "mnt"
    })
    res.render('medicalNews', {
        userData: userData,
        medicalData: medical
    })
}

module.exports = { newsView }