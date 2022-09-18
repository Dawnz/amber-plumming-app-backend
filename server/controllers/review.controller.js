const reviewM = require("../models/reviews.model");
const productM = require("../models/products.model");


/***
 * *Get All Reviews
 * !Used For Admin
*/
exports.getAllReviews = async (req, res) => {
  try {
    let review = await reviewM.find();
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Get Product By product
*/
exports.getReviewsByProduct = async (req, res) => {
  try {
    let review = await reviewM.findOne({ productID: req.params.id });
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Find Review By Id
*/
exports.getReviewById = async (req, res) => {
  try {
    let review = await reviewM.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Create Review
*/
exports.createReview = async (req, res) => {
  try {
    let review = await reviewM.create(req.body);
    const updatedReviewArray = await productM.findById(review.productID);
    updatedReviewArray["reviews"].push(review._id);
    console.log(updatedReviewArray);
    updatedCartArray.save();
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Update Review By Id
*/
exports.updateById = async (req, res) => {
  try {
    let review = await reviewM.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};


/***
 * *Delete Product By Id
*/
exports.deleteById = async (req, res) => {
  try {
    let review = await reviewM.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};
