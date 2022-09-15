
const { validateToken } = require( '../middlewares/auth')
const express =  require( 'express')
const { create, find, findOne, update, deleteOne } = require('../controllers/serviceRequest.controller')
const router = express('router')

router.route('/').post( validateToken).post(create)
                .get( validateToken).get(find)

router.route('/:id').get( validateToken).get(findOne)
                .patch( validateToken).patch(update)
                .delete( validateToken).delete(deleteOne)

module.exports = router