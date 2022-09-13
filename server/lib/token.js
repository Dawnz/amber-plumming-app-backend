const jwt = require('jsonwebtoken');

exports.createAccessToken = function( user){
    return jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
}
