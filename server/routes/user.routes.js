const { find, findOne, update, deleteOne } = require( '../controllers/user.controller')
const { validateToken } = require( '../middlewares/auth')
const express = require('express')
const router = express('router')

router.route('/').get( validateToken).get(find)

router.route('/:id')
    .get( validateToken).get( findOne)
    .patch( validateToken).patch( update)
    .delete( validateToken).delete( deleteOne)

module.exports = router