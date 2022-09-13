const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema ({
    customerID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    products: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "product",
            required: true
        },
    ],
    orderNumber: {
        type: String,
        required: true
    },
    orderTotal: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

let Orders = mongoose.model('order', orderSchema)
module.exports = Orders