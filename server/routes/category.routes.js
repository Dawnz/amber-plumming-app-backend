const express = require('express')
const router = express.Router()
const categoryC = require('../controllers/category.controller')

router.route('/').get(categoryC.getAllProducts).post(categoryC.createProduct)

router.route('/:id').get(categoryC.getProductById).put(categoryC.updateProductById).delete(categoryC.deleteProductById)

module.exports = router