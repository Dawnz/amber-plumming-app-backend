const mongoose = require('mongoose')

const userTypeSchema = new mongoose.Schema({
    name: {
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