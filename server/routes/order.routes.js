const express = require("express");
const router = express.Router();
const OrderC = require("../controllers/order.controller");
const { validateToken } = require("../middlewares/auth");

router
    .route("/")
    .get( validateToken).get(OrderC.getAllOrders)
    .post(OrderC.createOrder);

router
  .route("/:id")
  .get( validateToken).get(OrderC.getOrderById)
  .get( validateToken).get(OrderC.getCustomerOrders)
  .put( validateToken).put(OrderC.updateOrder)
  .delete( validateToken).delete(OrderC.deleteOrder);

module.exports = router;
