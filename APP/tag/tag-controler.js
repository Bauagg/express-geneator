const tag = require('./models')

const getTag = async (req, res, next) => {
    try {
        const newTag = await tag.find()
        res.status(200).json(newTag)
    } catch (err) {
        next(err)
    }
}

const postTag = async (req, res, next) => {
    try {
        const newTag = await tag.create({ name: req.body.name })
        res.status(201).json(newTag)
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

const putTag = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const newTag = await tag.updateOne({ _id: Object(id) }, { name })
        if (newTag.modifiedCount === 1) {
            return res.status(201).json(newTag)
        } else {
            return res.status(201).json({
                message: 'Data Is Not Updated',
                data: newTag
            })
        }
    } catch (err) {
        next(err)
    }
}

const deleteTag = async (req, res, next) => {
    try {
        const { id } = req.params
        const newTag = await tag.deleteOne({ _id: Object(id) })
        res.status(200).json(newTag)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getTag,
    postTag,
    putTag,
    deleteTag
}