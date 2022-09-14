const express = require("express");
const router = express.Router();
const productC = require("../controllers/products.controller");

router
    .route("/")
    .get(productC.getAllProducts)
    .post(productC.createProduct);

router
    .route("/all/:key")
    .get(productC.searchProducts);

router
  .route("/:id")
  .get(productC.getProductById)
  .put(productC.updateProductById)
  .delete(productC.deleteProductById);

module.exports = router;