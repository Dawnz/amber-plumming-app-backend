const userTypes = require("../models/userTypes.model")

exports.create = async ( req, res) => {
    //Deconstructor
    const { type } = req.body

    const newUserType = await userTypes.create({
        type
    })

    res.status( 201).json({
        status: "Success",
        data: {
            newUserType
        }
    })
}