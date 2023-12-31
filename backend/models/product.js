var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    product_title: { type: String, require: true },
    product_category_id: { type: Object, require: true },
    product_company_id: { type: String, require: true },
    product_image_filename: { type: String, require: true },
    product_description: { type: String, require: true },
    product_cost: { type: String, require: true },
    product_date: { type: String, require: true },
    product_stock: { type: String, require: true },
}, { collection: 'product' });

module.exports = mongoose.model('Product', Product);