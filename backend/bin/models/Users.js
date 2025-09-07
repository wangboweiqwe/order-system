const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const UsersSchema = new Schema({
    name: {
        type: String
    },
    hashedPassword: {
        type: String
    },
    telephone: {
        type: Number
    },
    address: {
        type: String
    },
    // role 0 管理员。 role 1 客户。
    role: {
        type: Number,
        default: 1
    },
})

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;