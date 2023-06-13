const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const { createInvoice } = require('./orderHooks')


const orderSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered'],
        default: 'waiting_payment'
    },
    delivery_fee: {
        type: Number,
        default: 0
    },
    delivery_address: {
        provinsi: { type: String, required: [true, 'provinsi harus di isi'] },
        kabupaten: { type: String, required: [true, 'kabupaten harus di isi'] },
        kecamatan: { type: String, required: [true, 'kecamatan harus di isi'] },
        kelurahan: { type: String, required: [true, 'kelurahan harus di isi'] },
        detail: { type: String }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItem'
    }]
}, { timestamps: true })

orderSchema.plugin(AutoIncrement, { inc_field: 'order_number' })

orderSchema.virtual('items_count').get(function () {
    return this.order_items.reduce((total, item) => total + parseInt(item.qty), 0)
})

// Order Hooks
orderSchema.post('save', createInvoice)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
