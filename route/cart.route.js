const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Cart = require('../model/api/cart');
const Product = require('../model/products');
const Order = require('../model/order');

/* Adding a product to a cart  */
router.get('/:id', function (req, res) {
   
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.status(400).send(err);
        }
        cart.add(product, product.id);
        req.session.cart = cart;

        return res.send(req.session.cart);
    });
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

// Payement 
router.post('/checkout', async (req, res, next) => {

    const { user } = req;
    const data = req.body;

    if(!req.session.cart){
        return res.send({products: null});
    }

    const cart = new Cart(req.session.cart);

    const token = await stripe.tokens.create({
      card: {
        account_holder_name: data.name, // user name
        address_city: data.address_city,
        number: data.number,
        exp_month: data.exp_month,
        exp_year: data.exp_year,
        cvc: data.cvc,//Code de sécurité de la carte
      },
    }, (err, next) => {
        if(err) return res.status(400).json({err});
        next();
    });

        const paymentIntent = await stripe.paymentIntents.create({
          amount: cart.totalPrice,
          currency: 'eur',
          payment_method_types: ['card'], //type cart
        }, (err, paymentIntent) => {
            if(err) return res.status(400).json({err});

            const order = new Order({
                user_id: user.id,
                cart: cart,
                paymentId: paymentIntent.id
            })

            Order.save(order, (err) => {
                if(err) return res.status(400).send(err);

                return res.send('Order successfully registered ');
            });
        });
    
});

module.exports = router;