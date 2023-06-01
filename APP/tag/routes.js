const router = require('express').Router()
const controlerTag = require('./tag-controler')

router.get('/tag', controlerTag.getTag)
router.post('/tag', controlerTag.postTag)
router.put('/tag/:id', controlerTag.putTag)
router.delete('/tag/:id', controlerTag.deleteTag)

module.exports = router