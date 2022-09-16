const orderM = require("../models/order.model");
const UserM = require("../models/user.model");

/***
 * * Get All Orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    // get user with role
    const user = UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if user is admin
    if (user.role.name == 'Admin') {
      let orders = await orderM
        .find({})
        .populate("products")
        .populate("customerID")
        .exec();
      res.status(200).json({
        status: "Success",
        length: orders.length,
        data: orders,
      });
    } else { //return unauthorized if user is not admin
      res.status(401).json({
        status: "Error",
        message: "Unauthorized activity"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * * Get Orders By Customer ID
 */
exports.getCustomerOrders = async (req, res) => {
  try {
    // get user with role
    const user = UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if orders for authenticated user/ user is admin
    if (user.role.name == 'Admin' || user._id == req.params.id) {
      let orders = await orderM
        .find({ customerID: req.params.id })
        .populate("products")
        .populate("customerID")
        .exec();
      res.status(200).json({
        status: "Success",
        length: orders.length,
        data: orders,
      });
    }else { //return unauthorized if user is not admin/orders are not for authorized user
      res.status(401).json({
        status: "Error",
        message: "Unauthorized activity"
      })
    }

  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * * Create All Orders
 */
exports.createOrder = async (req, res) => {
  try {
    //check if order is for authenticated user
    if( req.user.user == req.body.customerID){

      let order = await orderM.create({
        customerID: req.body.customerID,
        orderNumber: req.body.orderNumber,
        orderTotal: req.body.orderTotal,
        products: req.body.products,
      });
      const updatedCartArray = await UserM.findById(order.customerID);
      updatedCartArray["orders"].push(order._id);
      console.log(updatedCartArray);
      updatedCartArray.save();
      res.status(200).json({
        status: "Success",
        length: order.length,
        data: order,
      });
    }else { //return unauthorized if order is not for authenticated user
      res.status(401).json({
        status: "Error",
        message: "Unauthorized activity"
      })
    }
    
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * * Get Order By Id
 */
exports.getOrderById = async (req, res) => {
  try {
    // get user with role
    const user = UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if orders for authenticated user/ user is admin
    if (user.role.name == 'Admin' || user._id == req.params.id) {
      let order = await orderM.findById(req.params.id).populate("products");
    res.status(200).json({
      status: "Success",
      length: order.length,
      results: order,
    });
    }else { //return unauthorized if user is not admin/orders are not for authorized user
      res.status(401).json({
        status: "Error",
        message: "Unauthorized activity"
      })
    }    
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * * Update Order By Id
 */
exports.updateOrder = async (req, res) => {
  try {
    // get user with role
    const user = UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if order for authenticated user/ user is admin
    if (user.role.name == 'Admin' || user._id == req.params.id){
      let order = await orderM.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        status: "Success",
        length: order.length,
        data: order,
      });
    }else { //return unauthorized if user is not admin/orders are not for authorized user
      res.status(401).json({
        status: "Error",
        message: "Unauthorized activity"
      })
    } 
    
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * * Delete Order By Id
 */
exports.deleteOrder = async (req, res) => {
  try {
    // get user with role
    const user = UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if user is admin
    if (user.role.name == 'Admin'){
      let order = await orderM.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "Success",
        length: order.length,
        data: order,
      });
    }else { //return unauthorized if user is not admin
      res.status(401).json({
        status: "Error",
        message: "Unauthorized activity"
      })
    }    
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};
