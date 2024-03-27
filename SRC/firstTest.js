"use strict";
// DATA  ---------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
exports.app = (0, express_1.default)();
var port = 5000;
var products = [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" }
];
var addresses = [
    { id: 1, value: "Verkhne_Proletarskaya" },
    { id: 2, value: 'Arkhangelskaya' }
];
var parserMiddlelayer = (0, body_parser_1.default)();
exports.app.use(parserMiddlelayer);
// PROCESSES  ---------------------------------------
//////////// Скачать посман и попробовать сделать все эти запросы
////////////// Привязаться к хероку
exports.app.get('/products', function (req, res) {
    if (req.query.title) {
        var searchString_1 = req.query.title.toString();
        res.send(products.filter(function (p) { return p.title.indexOf(searchString_1) > -1; }));
    }
    else {
        res.send(products);
    }
});
exports.app.post('/products', function (req, res) {
    var newProduct = {
        id: +(new Date()),
        title: req.body.title
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
exports.app.get('/products/:id', function (req, res) {
    var product = products.find(function (p) { return p.id === +req.params.id; });
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.app.put('/products/:id', function (req, res) {
    var product = products.find(function (p) { return p.id === +req.params.id; });
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.app.delete('/products/:id', function (req, res) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
exports.app.get('/addresses', function (req, res) {
    res.send(addresses);
});
exports.app.get('/addresses/:id', function (req, res) {
    var address = addresses.find(function (p) { return p.id === +req.params.id; });
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
// STARTS APPLICATION---------------------------------------------
exports.app.listen(port, function () {
    console.log("\u0424\u0423\u0423\u0423\u0419\u0419 \u0411\u0410\u041B\u042F\u042F, \u0441\u0435\u0440\u0432\u0435\u0440 \u0441 \u043A\u0430\u0439\u0444\u043E\u043C \u0437\u0430\u043F\u0443\u0449\u0435\u043D ".concat(port));
});
