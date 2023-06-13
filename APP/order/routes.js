const router = require('express').Router()

const { police_ceck } = require('../../midelware/decodeToken')

const controlerModel = require('./order-Controler')

router.get('/order', police_ceck('view', 'Order'), controlerModel.getOrder)
router.post('/order', police_ceck('create', 'Order'), controlerModel.postOrder)

module.exports = router