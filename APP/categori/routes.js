const router = require('express').Router()

const controlerCategory = require('./categori-controler')
const { police_ceck } = require('../../midelware/decodeToken')

router.get('/category', controlerCategory.getCategory)
router.post('/category', police_ceck('create', 'Category'), controlerCategory.postCategory)
router.put('/category/:id', police_ceck('update', 'Category'), controlerCategory.putCategory)
router.delete('/category/:id', police_ceck('delete', 'Category'), controlerCategory.deleteCategory)

module.exports = router