const express = require('express');
const router = express.Router();

const apiCart = require('../model/api/cart');
const Product = require('../model/products');

router.post('/:id', function (req, res) {
    const productId = req.params.id;
    const cart = new apiCart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.status(400).send(err);
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        return res.send(req.session.cart);
    })
});

router.get('/reduce/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new apiCart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    return res.send(req.session.cart);
});

router.get('/remove/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new apiCart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    return res.send(req.session.cart);
});

router.get('/', function (req, res, next) {
    if(!req.session.cart) {
        return res.send({products: null});
    }
    const cart = new apiCart(req.session.cart);
    return res.send({products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;