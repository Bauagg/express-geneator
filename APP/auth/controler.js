const User = require('../user/models')
const validetbcrypt = require('../../utils/bcrypt')
const config = require('../config')
const { getToken } = require('../../utils/token')

const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const { full_name, email, password, role } = req.body

        // mengubah password menjadi text rendem
        const hashedPassword = await validetbcrypt.hashpassword(password)

        // validasi email apakah sudah terdaftar apa belum
        const isEmailRegistered = await User.exists({ email })
        if (isEmailRegistered) {
            return res.status(400).json({ error: 'Email sudah terdaftar' })
        }
        const newUser = await User.create({
            full_name,
            email,
            password: hashedPassword,
            role
        })
        res.status(201).json(newUser)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}


// login
const localStrategy = async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
            .select('-__v -createdAt -updateAt -cart_items -token')
        if (!user) return done()
        if (bcrypt.compareSync(password, user.password)) {
            const { password, ...userWihoutPassword } = user.toJSON()
            return done(null, userWihoutPassword)
        }
    } catch (err) {
        done(err, null)
    }
    done()
}

const login = async (req, res, next) => {
    passport.authenticate('local', async function (err, user) {
        if (err) return next(err)

        if (!user) return res.json({
            error: 1,
            message: 'Email or Password  incorect'
        })
        const secretkey = config.secretkey
        const signed = jwt.sign(user, secretkey)
        console.log(signed)
        await User.findByIdAndUpdate(user._id, { $push: { token: signed } })
        res.json({
            message: 'Login succesfuly',
            user,
            token: signed
        })
    })(req, res, next)
}
// login selesai

const logout = async (req, res, next) => {
    try {
        const token = getToken(req)

        const user = await User.findOne(
            { token: { $in: [token] } },
            { $pull: { token: token } },
            { useFindAndModify: false }
        )

        if (token || !user) {
            res.json({
                error: 0,
                message: 'Logout berhasil'
            })
        }
    } catch (err) {
        next(err)
    }
}

// untuk testing
const me = (req, res, next) => {
    if (req.user) {
        res.json({
            error: 1,
            message: `you're not login or token expired`
        })
    }
    res.json(req.user)
}

module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me
}
