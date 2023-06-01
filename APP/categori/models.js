const mongoose = require('mongoose')

const categoriScemah = mongoose.Schema({
    name: {
        type: String,
        minlenght: [3, 'panjang nama category minimal 3 karakter'],
        maxlenght: [20, 'psnjang nama category maksimal 20 karakter'],
        required: [true, 'nama harus di isi']
    }
})

const category = mongoose.model('category', categoriScemah)

module.exports = category