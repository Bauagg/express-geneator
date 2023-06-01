const router = require('express').Router()
const controlerCategory = require('./categori-controler')

router.get('/category', controlerCategory.getCategory)
router.post('/category', controlerCategory.postCategory)
router.put('/category/:id', controlerCategory.putCategory)
router.delete('/category/:id', controlerCategory.deleteCategory)

module.exports = router