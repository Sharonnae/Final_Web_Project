// Call needed middleware modules
const express = require('express'); // call nodejs's express
const app = express(); // set app to express
const bodyParser = require('body-parser'); // call this module to parse http post requests' data. 
const cookieParser = require("cookie-parser"); // call this module to parse cookie info.
const fileUpload = require('express-fileupload');  // for the patient and doctor photo upload.
const mongoose = require('mongoose'); // for mongodb connection
const dotenv = require("dotenv"); // to apply .env configuration
// const cors = require('cors');
const { seedAdmin } = require('./models/seedAdmin');
dotenv.config();

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('e don connect'))
    .catch(err => console.log(err));

seedAdmin() // create 'admin' user by default when starting the server.

// setup the middleware modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.set('view engine', 'ejs'); // see all files as .ejs files.

const PORT = process.env.PORT || 8000;

// mvc model links: urls clicks on html -> to the relevant route -> controller -> relevant action\ file.
app.use('/', require('./routes/home'));
app.use('/iwantsee', require('./routes/auth/test'));
app.use('/login', require('./routes/auth/login'));
app.use('/logout', require('./routes/auth/logout'));
app.use('/signup', require('./routes/auth/signup'));
app.use('/news', require('./routes/news'));
app.use('/admin', require('./routes/admin'))
app.use('/doctor', require('./routes/doctor'))
app.use('/patient', require('./routes/patient'))
app.use('/profileUpdate', require('./routes/profile'))

// After server is up listen to requests in port 8000.
app.listen(PORT, function () {
    console.log(`Server has started at port ${PORT}`);
});