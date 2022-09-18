const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();

const categoryRoute = require('../routes/category.routes')
const productRoute = require('../routes/product.routes')
const orderRoute = require('../routes/order.routes')
const authRoute = require( '../routes/auth.routes')
const serviceRequestsRoute = require( '../routes/serviceRequests.routes')
const userTypeRoute = require( '../routes/userType.routes')
const userRoute = require( '../routes/user.routes')
const reviewRoute = require('../routes/review.route')


// Middleware
app.use(morgan(':method :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(["*", "http://localhost:4200"]));
app.use("/uploads", express.static("uploads"));

morgan.token('param', function(req, res, param) {
    return req.params[param];
});


app.use('/category', categoryRoute)
app.use('/products', productRoute)
app.use('/review', reviewRoute)
app.use('/order', orderRoute)
app.use( '/auth', authRoute)
app.use( '/serviceRequests', serviceRequestsRoute)
app.use( '/userTypes', userTypeRoute)
app.use( '/user', userRoute)

module.exports = app;