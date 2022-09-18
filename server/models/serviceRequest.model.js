const mongoose = require( 'mongoose')

const serviceRequestSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Client ID must be specified']
    },
    title: {
        type: String,
        required: [true, ' A description must be specified']
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    qoute: {
        type: Number
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    status: {
        type: String,
        default: "Open"
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema)