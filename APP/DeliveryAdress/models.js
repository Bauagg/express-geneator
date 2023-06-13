const mongoose = require('mongoose')

const deliveryAdressScemah = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama alamat harus di isi'],
        maxlength: [255, 'panjang maksimal nama alamat adalah 255 karakter']
    },
    kelurahan: {
        type: String,
        required: [true, 'kelurahan harus di isi'],
        maxlength: [255, 'panjang maksimal nama kelurahan adalah 255 karakter']
    },
    kecamatan: {
        type: String,
        required: [true, 'kecamatan harus di isi'],
        maxlength: [255, 'panjang maksimal nama kecamatan adalah 255 karakter']
    },
    kabupaten: {
        type: String,
        required: [true, 'kabupaten harus di isi'],
        maxlength: [255, 'panjang maksimal nama kabupaten adalah 255 karakter']
    },
    provinsi: {
        type: String,
        required: [true, 'provinsi harus di isi'],
        maxlength: [255, 'panjang maksimal nama provinsi adalah 255 karakter']
    },
    detail: {
        type: String,
        required: [true, 'Detail alamat harus di isi'],
        maxlength: [1000, 'panjang maksimal detail alamat adalah 1000 karakter']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timesTamps: true })

const deliveryAdress = mongoose.model('deliveryAdress', deliveryAdressScemah)

module.exports = deliveryAdress