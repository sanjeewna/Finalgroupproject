var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    category_title: { type: String, require: true },
    category_description: { type: String, require: false },
    category_image: { type: String, require: true }
}, { collection: 'category' });

module.exports = mongoose.model('Category', Category);