const ServiceRequest = require('../models/serviceRequest.model')
const User = require('../models/user.model')

exports.create = async (req, res) => {
    try {
        //check if request is from authenticated user

        if (req.user.user == clientID) {
            //get serviceRequest data from deconstructor
            const { title, description, image, } = req.body

            //create the service
            const service = await ServiceRequest.create({
                clientID: req.user.user,
                title,
                description,
                image,
            })

            const serviceRequester = await User.findById(req.user.user)

            serviceRequester['serviceRequests'].push(service._id)

            serviceRequester.save()

            //send back the response
            res.status(201).json({
                status: 'Success',
                data: {
                    service
                }
            })
        } else { //return unauthorized if user is not auth user
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }

    } catch (err) {
        console.error(err)
    }
}

exports.find = async (req, res) => {
    try {
        //get user with role
        const user = await User.findById(req.user.user).populate('role')

        //if user not found
        if (!user) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        // check if user is admin 
        if (user.role.name == 'Admin') {
            //get all services from db
            const services = await ServiceRequest.find()

            //return all services
            res.status(200).json({
                status: 'Success',
                data: {
                    services
                }
            })
        } else { //return unauthorized if user is not auth user
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }

    } catch (err) {
        console.error(err)
    }
}

exports.findOne = async (req, res) => {
    try {
        //get user with role
        const user = await User.findById(req.user.user).populate('role')

        //if user not found
        if (!user) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        //use param id to find servcie
        const service = await ServiceRequest.findById(req.params.id)

        // check if user is admin or auth users request
        if (user.role.name == 'Admin' || req.user.user == service._id) {

            //check if service exists
            if (!service) {
                res.status(404).json({
                    status: 'Fail',
                    message: 'ServiceRequest Not Found',
                })
            }

            // return the service
            res.status(200).json({
                status: 'Success',
                message: 'ServiceRequest Found',
                data: {
                    service
                }
            })
        } else { //return unauthorized if user is not auth user
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }

    } catch (err) {
        console.error(err)
    }
}

exports.update = async (req, res) => {
    try {
        //get user with role
        const user = await User.findById(req.user.user).populate('role')

        //if user not found
        if (!user) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        // update provider, finding provider by id
        const service = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body)

        // check if user is admin or auth users request
        if (user.role.name == 'Admin' || req.user.user == service._id) {
            // check if the provider exists
            if (!service) {
                res.status(404).json({
                    status: 'Fail',
                    message: 'ServiceRequest Not Found'
                })
            }

            res.status(200).json({
                status: 'Success',
                message: 'ServiceRequest updated successfully',
                data: {
                    service
                }
            })
        } else { //return unauthorized if user is not auth user
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }
    } catch (err) {
        console.error(err)

    }
}

exports.deleteOne = async (req, res) => {
    try {
        //get user with role
        const user = await User.findById(req.user.user).populate('role')

        //if user not found
        if (!user) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        // check if user is admin 
        if (user.role.name == 'Admin') {
            //find and delete service
            const service = await ServiceRequest.findOneAndDelete({ _id: req.params.id });

            if (!service) {
                res.status(404).json({
                    status: 'Fail',
                    message: 'ServiceRequest Not Found'
                })
            }

            res.status(200).json({
                status: 'Success',
                message: 'ServiceRequest deleted successfully',
                data: {
                    service
                }
            })
        } else { //return unauthorized if user is not auth user
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }
    } catch (error) {
        console.error(error);
    }
}