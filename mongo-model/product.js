'use strict';

/**
 * Model for Product
 * Contains all the data from product
 * Also comprises QSchema for
 *  -> id 
 *  -> current_price: {
 *  ->  value:
 *  ->  currency_code
 *  ->  }
 */

const mongoose = require('mongoose');
const path = require('path');
const Schema = mongoose.Schema;


const productSchema = new Schema ({
    id: { type: String, index: true },
    current_price: {
        _id: false,
        value: Number,
        currency_code: String,
    },
}, { collection: 'products'});

productSchema.statics.getProduct = async function (id) {
    return this.findOne({ id }).lean().exec();
}

productSchema.statics.updatePrice = async function (id, product) {
    return this.findOneAndUpdate({ id: product.id }, { $set:{ current_price: product.current_price } });
}

module.exports = mongoose.model('product', productSchema);