"use strict";
// DATA  ---------------------------------------
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//
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
app.use(parserMiddlelayer);
// PROCESSES  ---------------------------------------
//////////// Скачать посман и попробовать сделать все эти запросы
////////////// Привязаться к хероку
app.get('/products', (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.post('/products', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.get('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.put('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    let address = addresses.find(p => p.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
// STARTS APPLICATION---------------------------------------------
app.listen(port, () => {
    console.log(`ФУУУЙЙ БАЛЯЯ, сервер с кайфом запущен ${port}`);
});
// import request from 'supertest'
// import {app} from "../SRC";
//
//
// describe ('/products', () => {
//     it ('xxx', () => {
//         request(app)
//
//     })
// })
// import {agent as supertest} from 'supertest'
// import {app} from 'express'
//
// const req = supertest(app)
// describe ('/videos', () => {
//     // beforeAll(async () => {
//     //
//     //     await  req.delete('/testing/all-data')
//     //         .expect(204)
//     // })
//
//     // afterAll (async ()=>{
//     // })
//
//     it ('GET products = []', async () => {
//         const res = await req
//             .get('/videos')
//             .expect(200)
//
//         console.log(res.body)
//     })
// })
