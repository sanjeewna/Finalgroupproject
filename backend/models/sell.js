var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sell = new Schema({
    sell_orders_id: { type: Object, require: true },
    sell_product_id: { type: Object, require: true },
    sell_units: { type: String, require: true },
    sell_total_cost: { type: String, require: true },
    sell_price_per_unit: { type: String, require: true }
}, { collection: 'sell' });

module.exports = mongoose.model('Sell', Sell);
