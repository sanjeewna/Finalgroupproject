var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Orders = new Schema({
    orders_customer_id: { type: Object, require: true },
    orders_date: { type: String, require: true },
    orders_status: { type: String, require: true },
    orders_total: { type: String, require: true }
}, { collection: 'orders' });

module.exports = mongoose.model('Orders', Orders);