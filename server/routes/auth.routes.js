const express =  require( 'express')
const { register, login, profile } = require('../controllers/auth.controller')
const { validateToken } = require( '../middlewares/auth')
const router = express('router')

router.route('/register').post(register)
router.route('/login').post(login)


router.route('/user').get(validateToken).get( profile)

module.exports = router