const mongoose = require('mongoose')

const orderItemScemah = mongoose.Schema({
    name: {
        type: String,
        minLength: [5, 'panjang nama minimal 5 krakter'],
        required: [true, 'nama harus di isi']
    },

    price: {
        type: Number,
        required: [true, 'harga item harus di isi']
    },

    qty: {
        type: Number,
        required: [true, 'quantitas harus di isi'],
        min: [1, 'quantitas minimal 1']
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
})

const OrderItem = mongoose.model('orderItem', orderItemScemah)

module.exports = OrderItem