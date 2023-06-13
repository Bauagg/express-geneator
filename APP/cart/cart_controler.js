const Cart = require('../cart_item/models')
const Product = require('../product/models')

const getCart = async (req, res, next) => {
    try {
        const newCart = await Cart.find({ user: req.user._id }).populate('product')

        res.status(200).json({
            error: false,
            message: 'get data Success',
            data: newCart
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

const putCart = async (req, res, next) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid items data'
            });
        }

        const products = items.map((item) => item.product._id);
        const newProducts = await Product.find({ _id: { $in: products } });

        let cartItems = items.map((item) => {
            let relatedProduct = newProducts.find(product => product._id.toString() === item.product._id.toString());
            return {
                updateOne: {
                    filter: {
                        user: req.user._id,
                        product: relatedProduct._id
                    },
                    update: {
                        product: relatedProduct._id,
                        price: relatedProduct.price,
                        image_url: relatedProduct.image_url,
                        name: relatedProduct.name,
                        user: req.user._id,
                        qty: item.qty
                    },
                    upsert: true
                }
            };
        });

        await Cart.deleteMany({ user: req.user._id })
        await Cart.bulkWrite(cartItems);

        return res.status(201).json({
            error: false,
            message: 'Update Success',
            data: cartItems
        });

    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            });
        }
        next(err);
    }
}


module.exports = {
    getCart,
    putCart
}

