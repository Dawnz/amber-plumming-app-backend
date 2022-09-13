const orderM = require("../models/order.model");

exports.getAllOrders = async (req, res) => {
  try {
    let orders = await orderM.find({}).populate("products");
    // let orders = await orderM.find({}).populate('products').populate('customerID')
    res.status(200).json({
      status: "Success",
      length: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    let order = await orderM.create({
      customerID: req.body.customerID,
      orderNumber: req.body.orderNumber,
      orderTotal: req.body.orderTotal,
      products: req.body.products,
    });
    res.status(200).json({
      status: "Success",
      length: order.length,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

// Get products by ID.
exports.getOrderById = async (req, res) => {
  try {
    let order = await orderM.findById(req.params.id).populate("products");
    res.status(200).json({
      status: "Success",
      length: order.length,
      results: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

// Update order by id
exports.updateOrder = async (req, res) => {
  try {
    let order = await orderM.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "Success",
      length: order.length,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

// Delete an Order model
exports.deleteOrder = async (req, res) => {
  try {
    let order = await orderM.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      length: order.length,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};
