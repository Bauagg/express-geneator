const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        minlenght: [3, 'panjang nama category minimal 3 karakter'],
        maxlenght: [20, 'psnjang nama category maksimal 20 karakter'],
        required: [true, 'nama harus di isi']
    }
})

const tag = mongoose.model('tag', tagSchema)

module.exports = tag