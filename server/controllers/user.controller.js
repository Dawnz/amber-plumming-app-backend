const Users = require( '../models/user.model')

exports.find = async( req, res) => {
    try {
        // get all users
        const users =  await Users.find()

        //return all users
        res.status( 200).json({
            status: 'Success',
            data: {
                users
            }
        })
    } catch (error) {
        console.error( error)
    }
}

exports.findOne = async( req, res) => {
    try{
        //find user by ID
        const user = await Users.findById( req.params.id).populate( 'role', 'name').select( 'firstName lastName email')

        //check if user exist
        if( !user) {
            res.status( 404).json({
                status: 'Error',
                message: "User not found"
            })
        }

        //return the user
        res.status( 200).json({
            status: 'Success',
            data: {
                user
            }
        })
    } catch( error){
        console.error( error)
    }
}

exports.update =  async( req, res) => {
    try{
        //find and update provider using req params and body
        const user =  await Users.findByIdAndUpdate( req.params.id, req.body)

        //check if user was found
        if( !user){
            res.status( 404).json({
                status: 'Error',
                message: "User not found"
            })
        }

        //return user
        res.status( 200).json({
            status: 'Success',
            data: {
                user
            }
        })

    } catch( error){
        console.error( error)
    }
}

exports.deleteOne = async( req, res) => {
    try {
        //find and delete user
        const user = await Users.findByIdAndDelete( req.params.id)

        //Check if user was found
        if( !user){
            res.status( 404).json({
                status: "Error",
                message: "User not found"
            })
        }

        //respond with deleted user
        res.status( 200).json({
            status: "Success",
            data: {
                user
            }
        })

    } catch (error) {
        console.error( error)
    }
}