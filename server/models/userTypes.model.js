const mongoose = require('mongoose')

const userTypeSchema = new mongoose.Schema({
    type: {
        type: String
    }, 
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true,
})

module.exports = mongoose.model("UserTypes", userTypeSchema)