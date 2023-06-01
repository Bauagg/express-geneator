const router = require('express').Router()
const passsport = require('passport')
const localStrategy = require('passport-local').Strategy

const authControler = require('./controler')

passsport.use(new localStrategy({ usernameField: 'email' }, authControler.localStrategy))

router.post('/register', authControler.register)
router.post('/login', authControler.login)
router.post('/logout', authControler.logout)
router.get('/me', authControler.me)


module.exports = router