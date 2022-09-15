const ServiceRequest = require('../models/serviceRequest.model')
const User = require('../models/user.model')

exports.create = async( req, res) => {
    try{
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
        res.status( 201).json({
            status: 'Success',
            data: {
                service
            }
        })
    } catch( err){
        console.error( err)
    }
}

exports.find = async( req, res) => {
    try{
        //get all services from db
        const services = await ServiceRequest.find()

        //return all services
        res.status( 200).json({
            status: 'Success',
            data: {
                services
            }
        })
    } catch( err){
        console.error( err)
    }
}

exports.findOne = async( req, res) =>{
    try{
        //use param id to find servcie
        const service = await ServiceRequest.findById(req.params.id)

        //check if service exists
        if( !service){
            res.status( 404).json({
                status: 'Fail',
                message: 'ServiceRequest Not Found',
            })
        }

        // return the service
        res.status( 200).json({
            status: 'Success',
            message: 'ServiceRequest Found',
            data: {
                service
            }
        })
    } catch( err){
        console.error( err)
    }
}

exports.update = async( req, res) => {
    try{
        // update provider, finding provider by id
        const service = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body) 

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
    } catch( err){
        console.error( err)

    }
}

exports.deleteOne = async( req, res) => {
    try {
        //find and delete service
        const service = await ServiceRequest.findOneAndDelete({ _id: req.params.id });

        if( !service){
            res.status(404).json({
                status: 'Fail',
                message: 'ServiceRequest Not Found'
            })
        }

        res.status( 200).json({
            status: 'Success',
            message: 'ServiceRequest deleted successfully',
            data: {
                service
            }
        })
    } catch (error) {
        console.error( error);
    }
}