const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    productID: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    review: {
      type: String,
      required: true
    },
  },
  {
    timeStamps: true,
  }
);

let Reviews = mongoose.model("review", reviewSchema);
module.exports = Reviews;
