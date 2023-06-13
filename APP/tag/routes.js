const router = require('express').Router()

const controlerTag = require('./tag-controler')
const { police_ceck } = require('../../midelware/decodeToken')

router.get('/tag', controlerTag.getTag)
router.post('/tag', police_ceck('create', 'Tag'), controlerTag.postTag)
router.put('/tag/:id', police_ceck('update', 'Tag'), controlerTag.putTag)
router.delete('/tag/:id', police_ceck('delete', 'Tag'), controlerTag.deleteTag)

module.exports = router