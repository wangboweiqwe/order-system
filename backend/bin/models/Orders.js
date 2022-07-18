const { Schema } = require("mongoose");

const Orders = Schema({
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
module.exports = Orders;