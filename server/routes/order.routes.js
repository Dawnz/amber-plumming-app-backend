const express = require('express')
const router = express.Router()
const OrderC = require('../controllers/order.controller')

router.route('/').get(OrderC.getAllOrders).post(OrderC.createOrder)

router.route('/:id').get(OrderC.getOrderById).put(OrderC.updateOrder).delete(OrderC.deleteOrder)

module.exports = router