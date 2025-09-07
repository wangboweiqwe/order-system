const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(global.mongoUrl);
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection open');
    });
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });
}