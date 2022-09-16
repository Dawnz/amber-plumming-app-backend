const express = require("express");
const router = express.Router();
const productC = require("../controllers/products.controller");
const { validateToken } = require("../middlewares/auth");

router
    .route("/")
    .get(productC.getAllProducts)
    .post( validateToken).post(productC.createProduct);

router
    .route("/all/:key")
    .get(productC.searchProducts);

router
  .route("/:id")
  .get(productC.getProductById)
  .put( validateToken).put(productC.updateProductById)
  .delete( validateToken).delete(productC.deleteProductById);

module.exports = router;