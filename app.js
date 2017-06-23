const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');

const boot = require('./boot');
const productRoute = require(path.join(global.SERVER_ROOT, 'routes', 'product'));

boot().then(() => {
    app.use(compression());
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(productRoute);

    app.get('/', function (req, res) {
    res.send('Hello World!')
    })

    app.listen(3000, function () {
    console.log('Target listening on port 3000!')
    })

}).catch((err) => {
    console.log(err);
});