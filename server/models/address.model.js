const mongoose = require( 'mongoose')

const addressSchema =  new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "user id must be specified"]
    },
    street: {
        type: String, 
        required: [ true, 'Street address must be specified']
    },
    town: {
        type: String, 
        required: [ true, 'Town must be specified']
    }, 
    parish: {
        type: String,
        required: [ true, "Parish must be specified"]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Address", addressSchema)