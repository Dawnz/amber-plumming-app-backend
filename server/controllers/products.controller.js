const productM = require("../models/products.model");
const UserM = require( '../models/user.model')

/***
 * *Get All Products
*/
exports.getAllProducts = async (req, res) => {
  try {
    let product = await productM.find().populate("categoryID");
    res.status(200).json({
      status: "Success",
      length: product.length,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Search Products
 * *Name
 * *Description
*/
exports.searchProducts = async (req, res) => {
  try {
    let product = await productM
      .find({
        $or: [
          { name: { $regex: req.params.key, $options: "i" } },
          { description: { $regex: req.params.key, $options: "i" } },
        ],
      })
      .populate("categoryID");
    res.status(200).json({
      status: "Success",
      length: product.length,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Get Product By Category
*/
exports.getProductsByCategory = async (req, res) => {
  try {
    const product = await productM
      .find({ categoryID: req.params.id })
      .populate("categoryID");
    res.status(200).json({
      status: "success",
      length: product.length,
      results: product,
    });
    console.log(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Get Product By Id
*/
exports.getProductById = async (req, res) => {
  try {
    let product = await productM.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      length: product.length,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

/***
 * *Create Product
*/
exports.createProduct = async (req, res) => {
  try {
    // get user with role
    const user = await UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if user is admin
    if (user.role.name == 'Admin'){
      let product = await productM.create(req.body);
      res.status(200).json({
        status: "Success",
        length: product.length,
        data: product,
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

/***
 * *Update Product By Id
*/
exports.updateProductById = async (req, res) => {
  try {
    // get user with role
    const user = await UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if user is admin
    if (user.role.name == 'Admin') {
      let product = await productM.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        status: "Success",
        length: product.length,
        data: product,
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

/***
 * *Delete Product By Id
*/
exports.deleteProductById = async (req, res) => {
  try {
    // get user with role
    const user = await UserM.findById(req.user.user).populate('role')

    //if user not found
    if (!user) {
      res.status(401).json({
        status: "Error",
        message: "unauthorized activity"
      })
    }

    // check if user is admin
    if (user.role.name == 'Admin'){
      let product = await productM.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "Success",
        length: product.length,
        data: product,
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
