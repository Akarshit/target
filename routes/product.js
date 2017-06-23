const api = require('../controller/product');
const express = require('express');
const router = new express.Router();

router.get('/product/:id', api.getProduct);
router.post('/product', api.putProduct);

module.exports = router;
