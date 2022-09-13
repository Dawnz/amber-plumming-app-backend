const express =  require( 'express')
const { create } = require('../controllers/userType.controller')
const router = express('router')

router.route( '/').post( create)


module.exports = router