const express = require("express");
const router = express.Router();
const reviewC = require("../controllers/review.controller");

router
    .route("/")
    .get(reviewC.getAllReviews)
    .post(reviewC.createReview);

router
  .route("/:id")
  .get(reviewC.getReviewsByProduct)
  .get(reviewC.getReviewById)
  .put(reviewC.updateById)
  .delete(reviewC.deleteById);

module.exports = router;
