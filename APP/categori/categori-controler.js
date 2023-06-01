const category = require('./models')

const getCategory = async (req, res, next) => {
    try {
        const newCategory = await category.find()
        res.status(200).json(newCategory)
    } catch (err) {
        next(err)
    }
}

const postCategory = async (req, res, next) => {
    try {
        const newCategory = await category.create({ name: req.body.name })
        res.status(201).json(newCategory)
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

const putCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const newCategory = await category.updateOne({ _id: Object(id) }, { name })
        if (newCategory.modifiedCount === 1) {
            return res.status(201).json(newCategory)
        } else {
            return res.status(201).json({
                message: 'Data Is Not Updated',
                data: newCategory
            })
        }
    } catch (err) {
        next(err)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const newCategory = await category.deleteOne({ _id: Object(id) })
        res.status(200).json(newCategory)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}