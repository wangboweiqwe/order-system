const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const OrdersSchema = Schema({
    goods: [{
        type: {
            type: String
        },
        amount: {
            type: Number
        },    
    }],
    user: {
        type: Schema.Types.ObjectId
    }
})
const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;