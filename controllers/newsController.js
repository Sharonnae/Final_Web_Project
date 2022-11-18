const Twitter = require('twitter')

const newsView = async (req, res) => {
    console.log('df', data)
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_KEY_SECRET,
        access_token_key: process.env.TWITTER_API_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
    });

    const medical = await client.get('statuses/user_timeline', {
        screen_name: "mnt"
    });
    const userData = await client.get('users/show.json', {
        screen_name: "mnt"
    })
    res.render('medicalNews', {
        userData: userData,
        medicalData: medical
    })
}

module.exports = { newsView }