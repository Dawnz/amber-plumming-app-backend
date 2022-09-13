const express = require('express')
const router = express.Router()
const product = require('../controllers/products.controller')

router.route('/').get(product.getAllProducts).post(product.createProduct)

router.route('/:id').get(product.getProductById).put(product.updateProductById).delete(product.deleteProductById)

module.exports = router