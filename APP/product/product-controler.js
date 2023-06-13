const product = require('./models')
const category = require('../categori/models')
const tag = require('../tag/models')

const getProduct = async (req, res, next) => {
    try {
        // penyediyaan filter, count & pagination
        let { skip = 0, limit = 0, q = '', searchCategory = '', searchTags = [] } = req.query
        let criteria = {}

        if (q.length) {
            criteria = {
                ...criteria, name: { $regex: q, $options: 'i' }
            }
        }

        if (searchCategory.length) {
            let categoryResoult = await category.findOne({ name: { $regex: searchCategory, $options: 'i' } })
            criteria = {
                ...criteria, category: categoryResoult._id
            }
        }

        if (searchTags.length) {
            let tagsResoult = await tag.find({ $in: tag })
            if (tagsResoult.length > 0) {
                criteria = {
                    ...criteria, tags: { $in: tagsResoult.map(tag => tag._id) }
                }
            }
        }

        // selesai
        const newProduct = await product
            .find(criteria)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('category')
            .populate('tags')
        res.status(200).json(newProduct)
    } catch (err) {
        next(err)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const newProduct = await product
            .findById(req.params.id)
            .populate('category')
            .populate('tags')
        res.status(200).json(newProduct)
    } catch (err) {
        next(err)
    }
}

const postProduct = async (req, res, next) => {
    try {
        // relasional databases one to one
        let payload = req.body
        if (payload.category) {
            let newCategory =
                await category.findOne({ name: { $regex: payload.category, $options: 'i' } })

            if (newCategory) {
                payload = { ...payload, category: newCategory._id }
            } else {
                delete payload.category
            }
        }

        // relasional databases many to many
        if (payload.tags && Array.isArray(payload.tags) && payload.tags.length > 0) {
            const newTags = await tag.find({ name: { $in: payload.tags } })
            if (newTags.length) {
                payload = { ...payload, tags: newTags.map(tag => tag._id) }
            } else {
                delete payload.tags
            }
        }

        const newProduct = await product.create({
            ...payload
        })
        res.status(201).json(newProduct)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        let payload = req.body

        // relasional databases one to one
        if (payload.category) {
            const newCategory = await category.findOne({ name: { $regex: payload.category, $options: 'i' } })
            if (newCategory) {
                payload = { ...payload, category: newCategory._id }
            } else {
                delete payload.category
            }
        }

        // relasional databases many to many
        if (payload.tags && payload.tags.length > 0) {
            const newTag = await tag.find({ name: { $in: payload.tags } })
            if (newTag.length) {
                payload = { ...payload, tags: newTag.map(tag => tag._id) }
            } else {
                delete payload.tags
            }
        }

        const newProduct = await product.updateOne({ _id: Object(id) }, {
            ...payload
        })
        if (newProduct.modifiedCount === 1) {
            res.status(201).json(newProduct)
        } else {
            res.status(201).json({
                message: 'Data Is Not Updated',
                data: newProduct
            })
        }
    } catch (err) {
        if (err && err.name) {
            res.json({
                error: 1,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const newProduct = await product.deleteOne({ _id: Object(req.params.id) })
        res.status(200).json(newProduct)
    } catch (err) {

        next(err)
    }
}

module.exports = {
    getProduct,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}