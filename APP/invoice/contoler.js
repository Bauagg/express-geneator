const Invoice = require('./models')

const { policyfor } = require('../../utils/otorisasi')

const { subject } = require('@casl/ability')

const getInvoice = async (req, res, next) => {
    try {
        const { order_id } = req.params
        const policy = policyfor(req.user)

        const invoice = await Invoice.findOne({ order: order_id }).populate('user').populate('order')

        if (!invoice) {
            return res.status(404).json({
                error: true,
                message: 'Invoice not found'
            });
        }

        const subjectINvoice = subject('Invoice', { ...invoice, user_id: invoice.user._id })

        if (!policy.can('read', subjectINvoice)) {
            return res.status(403).json({
                error: true,
                message: 'anda tidak memiliki akses inivoice ini'
            })
        }

        return res.json({
            error: false,
            message: 'get data Success',
            data: invoice
        })

    } catch (err) {
        if (err & err.name === ' ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                field: err.field
            })
        }
        next(err)
    }
}

module.exports = {
    getInvoice
}