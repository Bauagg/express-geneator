const router = require('express').Router()

const controlerDeliveryAdress = require('./deliveryAdress-controler')
const { police_ceck } = require('../../midelware/decodeToken')

router.get('/deliveryadress', police_ceck('view', 'DeliveryAddress'), controlerDeliveryAdress.getDeliveryAdress)
router.post('/deliveryadress', police_ceck('create', 'DeliveryAddress'), controlerDeliveryAdress.postDeliveryAdress)
router.put('/deliveryadress/:id', controlerDeliveryAdress.putDeliveryAdress)
router.delete('/deliveryadress/:id', controlerDeliveryAdress.deleteDeliveryAdress)

module.exports = router