const products = require('../models/products.model')

exports.getAllProducts = async (req, res) => {
    try {
        let product = await products.find().populate('categoryID')
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

exports.getProductById = async (req, res) => {
    try {
        let product = await products.findById(req.params.id)
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

exports.createProduct = async (req, res) => {
    try {
        let product = await products.create(req.body)
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
        let product = await products.findByIdAndUpdate(req.params.id, req.body)
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

exports.deleteProductById = async (req, res) => {
    try {
        let product = await products.findByIdAndDelete(req.params.id)
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