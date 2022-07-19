const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const OrdersSchema = Schema({
    type: {
        type: Number
    },
    amount: {
        type: Number
    },
    user: {
        _id: {
            type: Schema.Types.ObjectId
        }
    }
})
const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;