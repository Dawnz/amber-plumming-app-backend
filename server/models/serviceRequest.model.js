const mongoose = require( 'mongoose')

const serviceRequestSchema = new Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Client ID must be specified']
    },
    description: {
        type: String,
        required: [true, ' A description must be specified']
    },
    image: {
        type: String
    },
    qoute: {
        type: Number
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, 
    status: {
        type: String
    }
}, 
{
    timeStamps: true
})

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema)