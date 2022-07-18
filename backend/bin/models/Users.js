const { Schema } = require("mongoose")

const Users = new Schema({
    name: {
        type: String
    },
    telephone: {
        type: Number
    },
    address: {
        type: String
    },
    orders:[{
        _id: {
            type: Schema.Types.ObjectId
        }
    }]
})
module.exports = Users;