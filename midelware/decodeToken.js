const jwt = require('jsonwebtoken')

const config = require('../APP/config')
const { getToken } = require('../utils/token')
const User = require('../APP/user/models')

function decodeToken() {
    return async function (req, res, next) {
        try {
            const secretkey = config.secretkey
            let token = getToken(req)

            if (!token) return next()

            req.user = jwt.verify(token, secretkey, (err, decoded) => {
                if (err) {
                    console.error('Token verification failed:', err.message);
                } else {
                    console.log('Token verified:', decoded);
                }
            })

            let newUser = await User.findOne({ token: { $in: [token] } })

            if (!newUser) {
                res.json({
                    error: 1,
                    message: 'Token Expired'
                })
            }
        } catch (err) {
            if (err && err.name === 'JsonWebTokenError') {
                return res.json({
                    error: 1,
                    message: err.message
                })
            }
            next()
        }
    }
}

module.exports = {
    decodeToken
}




