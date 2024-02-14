"use strict";
// DATA  ---------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = 5000;
const products = [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" }
];
const addresses = [
    { id: 1, value: "Verkhne_Proletarskaya" },
    { id: 2, value: 'Arkhangelskaya' }
];
const parserMiddlelayer = (0, body_parser_1.default)();
exports.app.use(parserMiddlelayer);
// PROCESSES  ---------------------------------------
//////////// Скачать посман и попробовать сделать все эти запросы
////////////// Привязаться к хероку
exports.app.get('/products', (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
exports.app.post('/products', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
exports.app.get('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.app.put('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
exports.app.get('/addresses', (req, res) => {
    res.send(addresses);
});
exports.app.get('/addresses/:id', (req, res) => {
    let address = addresses.find(p => p.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
// STARTS APPLICATION---------------------------------------------
exports.app.listen(port, () => {
    console.log(`ФУУУЙЙ БАЛЯЯ, сервер с кайфом запущен ${port}`);
});
