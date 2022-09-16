const express = require('express')
const router = express.Router()
const categoryC = require('../controllers/category.controller')
const { validateToken } = require( '../middlewares/auth')

router.route('/').get(categoryC.getAllProducts).post(categoryC.createProduct)

router.route('/:id').get(categoryC.getProductById).put( validateToken).put(categoryC.updateProductById).delete( validateToken).delete(categoryC.deleteProductById)

module.exports = router