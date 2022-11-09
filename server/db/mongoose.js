var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

//change the database with yours
mongoose.connect("mongodb://localhost:27017/hospitaldb");

module.exports = {mongoose};
