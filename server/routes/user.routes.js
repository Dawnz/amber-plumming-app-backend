const { find, findOne, update, deleteOne } = require( '../controllers/user.controller')
const { validateToken } = require( '../middlewares/auth')
const express = require('express')
const router = express('router')

router.route('/').get(find)

router.route('/:id')
    .get( findOne)
    .patch( validateToken).patch( update)
    .delete( deleteOne)

module.exports = router