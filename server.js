const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const { seedAdmin } = require('./models/seedAdmin');
dotenv.config();
// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('e don connect'))
.catch(err => console.log(err));

seedAdmin()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());
app.use(cors());

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;

app.use('/', require('./routes/home'));
app.use('/iwantsee', require('./routes/auth/test'));
app.use('/login', require('./routes/auth/login'));
app.use('/logout', require('./routes/auth/logout'));
app.use('/signup', require('./routes/auth/signup'));
app.use('/admin', require('./routes/admin'))
app.use('/doctor', require('./routes/doctor'))
app.use('/patient', require('./routes/patient'))
app.use('/profileUpdate', require('./routes/profile'))

app.listen(PORT, function () {
    console.log(`Server has started at port ${PORT}`);
});