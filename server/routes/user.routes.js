const { find, findOne, update, deleteOne, getUsersByRole, userRequests } = require( '../controllers/user.controller')
const { validateToken } = require( '../middlewares/auth')
const express = require('express')
const router = express('router')

router.route('/').get(find)

router.route('/:id')
    .get( findOne)
    .patch( validateToken).patch( update)
    .delete( deleteOne)

router.route( '/:id/requests').get( validateToken).get( userRequests)

router.route( '/roles/:role').get( validateToken).get( getUsersByRole)

module.exports = router