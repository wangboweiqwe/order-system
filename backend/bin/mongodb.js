const mongoose = require('mongoose');

const Users = require('./models/Users');
const Orders = require('./models/Orders');

module.exports = () => {
    mongoose.connect('mongodb://staticPath:build1472@localhost/infoEntry?authSource=admin');
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