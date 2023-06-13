const { subject } = require('@casl/ability')

const { policyfor } = require('../../utils/otorisasi')

const deliveryAdress = require('./models')

const getDeliveryAdress = async (req, res, next) => {
    try {
        const newDeliveryAdress = await deliveryAdress.find()
        return res.status(200).json({
            Error: false,
            message: 'Succes',
            data: newDeliveryAdress
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const postDeliveryAdress = async (req, res, next) => {
    try {
        const payload = req.body
        const user = req.user
        const newDeliveryAdress = new deliveryAdress({ ...payload, user: user._id })
        await newDeliveryAdress.save()
        res.status(201).json({
            error: false,
            message: ' menambah data telah berhasil',
            data: newDeliveryAdress
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const putDeliveryAdress = async (req, res, next) => {
    try {
        const { _id, ...payload } = req.body
        const { id } = req.params

        let address = await deliveryAdress.findById(id)

        if (!address) {
            return res.status(404).json({
                error: true,
                message: 'Address not found'
            })
        }

        const subjectAddress = subject('DeliveryAddress', { ...address, user_id: address.user })

        const policy = policyfor(req.user)

        if (!policy.can('update', subjectAddress)) {
            return res.status(403).json({
                error: true,
                message: "Anda tidak diizinkan mengubah sumber daya ini"
            })
        }

        address = await deliveryAdress.findByIdAndUpdate(id, payload, { new: true })
        res.status(200).json({
            error: false,
            message: 'update success',
            data: address
        })

    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.fields
            })
        }
        next()
    }
}

const deleteDeliveryAdress = async (req, res, next) => {
    try {
        const { id } = req.params
        let address = await deliveryAdress.findById(id)

        if (!address) {
            return res.status(404).json({
                error: true,
                message: 'Address not found'
            })
        }

        const subjectAdress = subject('DeliveryAddress', { ...address, user_id: address.user })

        const policy = policyfor(req.user)

        if (!policy.can('delete', subjectAdress)) {
            return res.status(403).json({
                error: true,
                message: "Anda tidak diizinkan mengubah sumber daya ini"
            })
        }

        address = await deliveryAdress.findByIdAndDelete(id)

        res.status(200).json({
            error: false,
            message: 'delete success',
            data: address
        })

    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

module.exports = {
    getDeliveryAdress,
    postDeliveryAdress,
    putDeliveryAdress,
    deleteDeliveryAdress
}