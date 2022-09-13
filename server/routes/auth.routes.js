const express =  require( 'express')
const { register, login,  account } = require('../controllers/auth.controller')
// const { validateToken } = require('../middlewares/auth')
const router = express('router')

router.route('/register').post(register)
router.route('/login').post(login)


// router.route('/user').get(validateToken).get( account)

module.exports = router