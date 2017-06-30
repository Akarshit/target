const _ = require('lodash');
const is = require('is_js');
const rp = require('request-promise');
const sa = require('safe-access');

const api = {};
const path = require('path');
const Product = require(path.join(global.SERVER_ROOT, 'mongo-model', 'product'));
const { mapAsync } = require(path.join(global.SERVER_ROOT, 'utils'));

api.getProduct = async (req, res) => {
    const id = Number(req.params.id);
    if (is.not.number(id)) {
        res.status(400).json("Invalid Id");
        return;
    }
    const product = await Product.getProduct(id);
    if (product === null) {
        res.status(400).json("Id not in database");
        return;
    }
    const metadata = JSON.parse(await rp(`https://api.target.com/products/v3/${product.id}?fields=descriptions&id_type=TCIN&key=43cJWpLjH8Z8oR18KdrZDBKAgLLQKJjz`));
    product.name = sa(metadata, 'product_composite_response.items[0].online_description.value')
    res.status(200).json(product);
}

api.updatePrice = async (req, res) => {
    const product = req.body;
    if (is.not.propertyDefined(product, 'current_price')
        || is.not.propertyDefined(product.current_price, 'value')
        || is.not.propertyDefined(product.current_price, 'currency_code')
        || is.not.number(product.current_price.value)) {
        res.status(400).json({ message: "body is not in expected format", format: { current_price: { value: "Integer", currency_code: "String"}}});
        return;
    }
    const id = Number(req.params.id);
    if (is.not.number(id)) {
        res.status(400).json("Invalid Id");
        return;
    }
    const result = await Product.updatePrice(id, product);
    if (result === null) {
        res.status(400).json("Id not in database");
        return;
    }
    res.status(200).json(product);
}

module.exports = mapAsync(api);