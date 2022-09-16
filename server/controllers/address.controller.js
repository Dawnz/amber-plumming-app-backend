const Address = require('../models/address.model')
const User = require('../models/user.model')

exports.create = async( req, res) => {
    try{
        //get address data from deconstructor
        const { street, town, parish } = req.body

        //create the address
        const address = await Address.create({
            userID: req.user.user,
            street,
            town,
            parish, 
        })

        let user = await User.findById(req.user.user)
        console.log( user);
        user.address = address._id

        user.save()

        //send back the response
        res.status( 201).json({
            status: 'Success',
            data: {
                address
            }
        })
    } catch( err){
        console.error( err)
    }
}

exports.find = async( req, res) => {
    try{
        //get all addresses from db
        const addresses = await Address.find()

        //return all addresses
        res.status( 200).json({
            status: 'Success',
            data: {
                addresses
            }
        })
    } catch( err){
        console.error( err)
    }
}

exports.findOne = async( req, res) =>{
    try{
        //use param id to find servcie
        const address = await Address.findById(req.params.id)

        //check if address exists
        if( !address){
            res.status( 404).json({
                status: 'Fail',
                message: 'Address Not Found',
            })
        }

        // return the address
        res.status( 200).json({
            status: 'Success',
            message: 'Address Found',
            data: {
                address
            }
        })
    } catch( err){
        console.error( err)
    }
}

exports.update = async( req, res) => {
    try{
        // update provider, finding provider by id
        const address = await Address.findByIdAndUpdate(req.params.id, req.body) 

        // check if the provider exists
        if (!address) {
            res.status(404).json({
                status: 'Fail',
                message: 'Address Not Found'
            })
        }

        res.status(200).json({
            status: 'Success',
            message: 'Address updated successfully',
            data: {
                address
            }
        })
    } catch( err){
        console.error( err)

    }
}

exports.deleteOne = async( req, res) => {
    try {
        //find and delete address
        const address = await Address.findOneAndDelete({ _id: req.params.id });

        if( !address){
            res.status(404).json({
                status: 'Fail',
                message: 'Address Not Found'
            })
        }

        res.status( 200).json({
            status: 'Success',
            message: 'Address deleted successfully',
            data: {
                address
            }
        })
    } catch (error) {
        console.error( error);
    }
}