const Invoice = require('../invoice/models')

const createInvoice = async function () {
    try {
        const sub_total = this.order_items.reduce((total, item) => total + (item.price * item.qty), 0)

        const newinvoice = new Invoice({
            user: this.user,
            order: this._id,
            order_number: this.order_number,
            sub_total: sub_total,
            delivery_fee: parseInt(this.delivery_fee),
            total: parseInt(sub_total + this.delivery_fee),
            delivery_address: this.delivery_address
        })
        await newinvoice.save()
    } catch (err) {
        console.log(err)
    }
}

module.exports = { createInvoice }