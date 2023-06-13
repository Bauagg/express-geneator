const controlerInvoice = require('./contoler')

const router = require('express').Router()

router.get('/invoice/:order_id', controlerInvoice.getInvoice)

module.exports = router