const mongoose = require('mongoose')
const path = require('path')

let useSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'nama harus di isi'],
        maxlength: [255, 'panjang nama harus antara 3 - 255 karakter'],
        minlength: [3, 'panjang nama harus antara 3 - 255 karakter']
    },
    customer_id: {
        type: Number
    },
    email: {
        type: String,
        required: [true, 'email harus di isi'],
        maxlength: [255, 'panjang email maksimal 255 karakter'],
        // validasi email
        validate: {
            validator: (email) => {
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                return emailRegex.test(email)
            },
            message: props => `${props.value} Email tidak valid`
        }
    },
    password: {
        type: String,
        required: [true, 'password harus di isi'],
        minlength: [3, 'panjang nama harus antara 3 - 255 karakter'],
        maxlength: [255, 'panjang password maksimal 255 karakter']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        message: '{VALUE} is not supported',
        default: 'user'
    },
    token: String
}, { timestamp: true })

const User = mongoose.model('user', useSchema)

module.exports = User