const api = require('../controller/product');
const express = require('express');
const router = new express.Router();

router.get('/product/:id', api.getProduct);
router.post('/product/', api.putProduct);
router.post('/product/:id', api.updatePrice);

module.exports = router;
