const router = require('express').Router()
const controlerProduct = require('./product-controler')

router.get('/product', controlerProduct.getProduct)
router.get('/product/:id', controlerProduct.getProductById)
router.post('/product', controlerProduct.postProduct)
router.put('/product/:id', controlerProduct.updateProduct)
router.delete('/product/:id', controlerProduct.deleteProduct)

module.exports = router