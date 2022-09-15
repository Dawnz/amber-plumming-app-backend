const userTypes = require("../models/userTypes.model")

exports.create = async ( req, res) => {
    //Deconstructor
    const { name } = req.body

    const newUserType = await userTypes.create({
        name
    })

    res.status( 201).json({
        status: "Success",
        data: {
            newUserType
        }
    })
}