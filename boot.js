global.SERVER_ROOT = __dirname;

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = async () => await mongoose.connect('mongodb://localhost/target')
    .then(console.log("Everything is up and running"))
    .catch((err) => { console.error("Can't connect to mongo. Bring the application down.") });