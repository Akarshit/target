const _ = require('lodash');
const is = require('is_js');
const rp = require('request-promise');
const sa = require('safe-access');

const api = {};
const path = require('path');
const Product = require(path.join(global.SERVER_ROOT, 'mongo-model', 'product'));
const { mapAsync } = require(path.join(global.SERVER_ROOT, 'utils'));

api.getProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.getProduct(id);
    if (!product) {
        return res.status(404);
    }
    const metadata = JSON.parse(await rp(`https://api.target.com/products/v3/${product.id}?fields=descriptions&id_type=TCIN&key=43cJWpLjH8Z8oR18KdrZDBKAgLLQKJjz`));
    product.name = sa(metadata, 'product_composite_response.items[0].online_description.value')
    res.status(200).json(product);
    
}

api.putProduct = async (req, res) => {
    const product = req.body;
    const result = await Product.putProduct(product);
    res.status(200).json(result);
}

module.exports = mapAsync(api);