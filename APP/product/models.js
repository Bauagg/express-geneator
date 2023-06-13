const mongoose = require('mongoose')


const productScemah = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama product harus di isi']
    },
    descriptions: {
        type: String,
        maxlenght: [1000, 'descriptions harus di isi'],
        required: [true, 'descriptions harus di isi']
    },
    stock: {
        type: Number,
        required: [true, 'stock harus di isi']
    },
    price: {
        type: Number,
        required: [true, 'price harus di isi']
    },
    status: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    }
})

const product = mongoose.model('product', productScemah)

module.exports = product