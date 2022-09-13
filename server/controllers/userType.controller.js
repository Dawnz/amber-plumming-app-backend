const userTypes = require("../models/userTypes.model")

exports.create = async ( req, res) => {
    //Deconstructor
    const { userType } = req.body

    const newUserType = await userTypes.create({
        userType
    })

    res.status( 201).json({
        status: "Success",
        data: {
            newUserType
        }
    })
}