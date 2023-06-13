const mongoose = require('mongoose')

const cartItemScemah = mongoose.Schema({
    name: {
        type: String,
        minlength: [5, 'panjang nama product minimal 5 karakter'],
        required: [true, 'name harus di isi']
    },
    qty: {
        type: Number,
        required: [true, ' qty harus di isi'],
        min: [1, 'minimal qty adalah 1']
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
}, { timestamps: true })

const Cart = mongoose.model('cart', cartItemScemah)

module.exports = Cart