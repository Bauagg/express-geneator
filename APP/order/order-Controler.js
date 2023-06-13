const CartItems = require('../cart_item/models')
const DeliveryAddress = require('../DeliveryAdress/models')
const Order = require('./models')
const OrderItem = require('../order-item/models')

const getOrder = async (req, res, next) => {
    try {
        const { skip = 0, limit = 0 } = req.query
        const newOrder = await Order.find({ user: req.user._id }).countDocuments()
        const orders = await Order
            .find({ user: req.user._id })
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('order_items')
            .sort('-createdAt')

        return res.status(200).json({
            error: false,
            message: 'get data Success',
            data: orders.map((order) => order.toJSON({ virtuals: true })),
            newOrder: newOrder
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}


const postOrder = async (req, res, next) => {
    try {
        const { delivery_address, delivery_fee } = req.body

        const items = await CartItems.find({ user: req.user._id }).populate('product')
        if (!items || items.length === 0) {
            return res.status(403).json({
                error: true,
                message: `Anda tidak membuat pesanan karena Anda tidak memiliki barang di keranjang`
            })
        }

        const addreess = await DeliveryAddress.findById(delivery_address)

        const order = new Order({
            status: 'waiting_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: addreess.provinsi,
                kabupaten: addreess.kabupaten,
                kecamatan: addreess.kecamatan,
                kelurahan: addreess.kelurahan,
                detail: addreess.detail
            },
            user: req.user._id,
            order_items: []
        })

        let orderItems = await OrderItem.insertMany(items.map((item) => ({
            ...item,
            name: item.product.name,
            qty: parseInt(item.qty),
            price: parseInt(item.product.price),
            order: order._id,
            product: item.product._id
        })))


        orderItems.forEach((element) => {
            order.order_items.push(element)
        })


        order.save()

        await CartItems.deleteMany({ user: req.user._id })

        return res.status(201).json({
            error: false,
            message: 'post data Success',
            data: order
        })

    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

module.exports = {
    getOrder,
    postOrder
}


