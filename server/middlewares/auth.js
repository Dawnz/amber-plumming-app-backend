const jwt = require('jsonwebtoken')

exports.validateToken = (req, res, next) => {
    // check for auth in request headers
    const authHeader = req.headers["authorization"]
    if (authHeader) {
        const token = authHeader.split(" ")[1]

        //If no token found
        if (token == null) {
            res.status(401).json({
                message: "Token not found"
            })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({
                    status: "Failed",
                    message: "Invalid access token"
                })
            } else {
                console.log(user);
                req.user = user
                next()
            }
        })

    } else {
        res.status( 401).json({
            message: "unauthorized"
        })
    }
}