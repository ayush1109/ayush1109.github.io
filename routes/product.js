const express = require('express');
const productRouter = express.Router();

const Product = require('../models/product');

productRouter.route('/')
.get((req, res, next) => {           //get all products
    Product.find({})
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch((err) => next(err));
})

.post((req, res, next) => {            //insert a product or products
    var productArray = new Array();
    productArray = req.body;
    console.log('line 21 executed')
    productArray.forEach((product) => {
        console.log('line 23 executed')
        Product.create(product)
            .then((product) => {
                console.log(product)
            })
            .catch((err) => next(err));
    })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(productArray);
})

.delete((req, res, next) => {
    Product.remove({})
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch((err) => next(err));
})

productRouter.route('/:productId')

.get((req, res, next) => {
    Product.findById(req.params.productId)
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    })
    .catch((err) => next(err));
})

.put((req, res, next) => {
    Product.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
})

.delete((req, res, next) => {
    Product.findByIdAndRemove(req.params.productId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err) => next(err));
})

module.exports = productRouter;

