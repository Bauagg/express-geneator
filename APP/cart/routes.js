const router = require('express').Router()

const { police_ceck } = require('../../midelware/decodeToken')

const Cart_Controler = require('./cart_controler')

router.get('/cart', police_ceck('read', 'Cart'), Cart_Controler.getCart)
router.put('/cart', police_ceck('update', 'Cart'), Cart_Controler.putCart)

module.exports = router