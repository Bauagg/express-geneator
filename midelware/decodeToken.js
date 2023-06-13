const jwt = require('jsonwebtoken')

const config = require('../APP/config')
const { getToken } = require('../utils/token')
const User = require('../APP/user/models')
const { policyfor } = require('../utils/otorisasi')

function decodeToken() {
    return async function (req, res, next) {
        try {
            const secretkey = config.secretkey
            let token = getToken(req)

            if (!token) return next()

            req.user = jwt.verify(token, secretkey)
            const user = await User.findOne({ token: { $in: [token] } })
            if (!user) {
                return res.json({
                    error: false,
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
        return next()
    }
}

//midelware untuk cek hak akses
function police_ceck(action, subject) {
    return (req, res, next) => {
        try {
            const policy = policyfor(req.user)
            if (!policy.can(action, subject)) {
                return res.json({
                    error: true,
                    message: `You are no allowed to ${action} ${subject}`
                })
            }
        } catch (err) {
            next(err)
        }
        next()
    }
}

module.exports = {
    decodeToken,
    police_ceck
}

