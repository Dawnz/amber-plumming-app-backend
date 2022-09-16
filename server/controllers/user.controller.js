
const Users = require('../models/user.model')
const userTypes = require('../models/userTypes.model')

exports.find = async (req, res) => {
    try {
        //get user with role
        const user = await Users.findById(req.user.user).populate('role')

        //if user not found
        if (!user) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        console.log(user);

        // check if user is admin 
        if (user.role.name == 'Admin') {
            // get all users
            const users = await Users.find()

            //return all users
            res.status(200).json({
                status: 'Success',
                data: {
                    users
                }
            })
        } else { //return unauthorized if user is not admin
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }
    } catch (error) {
        console.error(error)
    }
}

exports.findOne = async (req, res) => {
    try {
        //get user with role
        const authUser = await Users.findById(req.user.user).populate('role')

        //if user not found
        if (!authUser) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        // check if user is admin 
        if (authUser.role.name == 'Admin') {
            //find user by ID
            const user = await Users.findById(req.params.id).populate('role', 'name').select('firstName lastName email')

            //check if user exist
            if (!user) {
                res.status(404).json({
                    status: 'Error',
                    message: "User not found"
                })
            }

            //return the user
            res.status(200).json({
                status: 'Success',
                data: {
                    user
                }
            })
        } else { //return unauthorized if user is not admin
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }

    } catch (error) {
        console.error(error)
    }
}

exports.update = async (req, res) => {
    try {
        //get user with role
        const authUser = await User.findById(req.user.user).populate('role')

        //if user not found
        if (!authUser) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        // check if user is admin 
        if (authUser.role.name == 'Admin' || req.user.user == req.params.id) {
            //find and update provider using req params and body
            const user = await Users.findByIdAndUpdate(req.params.id, req.body)

            //check if user was found
            if (!user) {
                res.status(404).json({
                    status: 'Error',
                    message: "User not found"
                })
            }

            //return user
            res.status(200).json({
                status: 'Success',
                data: {
                    user
                }
            })
        } else { //return unauthorized if user is not admin
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }
    } catch (error) {
        console.error(error)
    }
}

exports.deleteOne = async (req, res) => {
    try {
        //get user with role
        const authUser = await Users.findById(req.user.user).populate('role')

        //if user not found
        if (!authUser) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        // check if user is admin 
        if (authUser.role.name == 'Admin') {
            //find and delete user
            const user = await Users.findByIdAndDelete(req.params.id)

            //Check if user was found
            if (!user) {
                res.status(404).json({
                    status: "Error",
                    message: "User not found"
                })
            }

            //respond with deleted user
            res.status(200).json({
                status: "Success",
                data: {
                    user
                }
            })
        } else { //return unauthorized if user is not admin
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }
    } catch (error) {
        console.error(error)
    }
}

exports.getUsersByRole = async( req, res) => {
    try {
        //get all users by param role
        const users = await userTypes.find({ name: req.params.role}).populate( 'users', ' firstName lastName email').select( 'name')

        res.status( 200).json({
            status: "Success",
            data:{
                users
            }
        })
    } catch (error) {
        console.error( error)
    }
}

exports.userRequests = async( req, res) => {
    try{
        //get user and populate serviceRequests
        const user = await Users.findById( req.params.id).populate({
            path: 'serviceRequests',
            select: {'updatedAt': 0},
            populate: [{ path: 'assignedTo', select: { 'firstName': 1, 'lastName': 1, 'email': 1, 'phone': 1}}]
        }).select( 'serviceRequests')

        console.log(user);

        res.status( 200).json({
            status: "Success",
            data: {
                user
            }
        })
    } catch ( error){
        console.error( error)
    }
}