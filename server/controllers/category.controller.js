const category = require('../models/categories.model')
const User = require('../models/user.model')

exports.getAllProducts = async (req, res) => {
    try {
        let products = await category.find()
        res.status(200).json({
            status: "Success",
            length: products.length,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        let products = await category.findById(req.params.id)
        res.status(200).json({
            status: "Success",
            length: products.length,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        let product = await category.create(req.body)
        res.status(200).json({
            status: "Success",
            length: product.length,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

exports.updateProductById = async (req, res) => {
    try {
        //get user with role
        const user = User.findById(req.user.user).populate('role')

        //if user not found
        if (!user) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }

        // check if user is admin
        if (user.role.name == 'Admin') {
            let product = await category.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json({
                status: "Success",
                length: product.length,
                data: product
            })
        } else { //return error if not admin
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

exports.deleteProductById = async (req, res) => {
    try {
        // get user with role
        const user = User.findById(req.user.user).populate('role')

        //if user not found
        if (!user) {
            res.status(401).json({
                status: "Error",
                message: "unauthorized activity"
            })
        }
        
        // check if user is admin
        if (user.role.name == 'Admin') {
            let product = await category.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status: "Success",
                length: product.length,
                data: product
            })
        }else { //return unauthorized if user is not admin
            res.status(401).json({
                status: "Error",
                message: "Unauthorized activity"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}