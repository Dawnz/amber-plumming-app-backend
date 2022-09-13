const express = require('express')
const router = express.Router()
const category = require('../controllers/category.controller')

router.route('/').get(category.getAllProducts).post(category.createProduct)

router.route('/:id').get(category.getProductById).put(category.updateProductById).delete(category.deleteProductById)

module.exports = router