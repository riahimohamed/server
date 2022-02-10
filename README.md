# Node and Stripe Shopping Cart

Express + Facebook + Twitter and Jwt

**This application** resembles a real store and you can add products to your cart and pay for them. If you want to try the checkout process, you can use the fake card number provided by stripe, but first you should authenticate with your email or by Facebook or Twitter.

## Quick Start

1. Fork/Clone
2. Install dependencies:

```bash
$ npm install
```
3. Create stripe account - Login if you already have [Login](https://dashboard.stripe.com/login) or [Register](https://dashboard.stripe.com/register)

   - [Create an app on Facebook](https://developers.facebook.com/apps) and set the Website URL to http://localhost:3000/auth/facebook/callback

   - [Create an app on Twitter](https://apps.twitter.com/) and set the Website URL to http://localhost:3000/auth/twitter/callback

4. Copy the App ID and Secret from the Facebook, consumer key and consumer secret from Twitter and too STRIPE SECRET KEY app settings page into your .env:

```

...
STRIPE_SECRET_KEY = 'YOUR KEY'

FACEBOOK_CLIENT_ID = 'YOUR KEY'
FACEBOOK_CLIENT_SECRET = 'YOUR SERCRET'
FACEBOOK_CALLBACK_URL = 'http://localhost:3000/auth/facebook/callback'

TWITTER_CONSUMER_KEY = 'YOUR CONSUMER KEY'
TWITTER_CONSUMER_SECRET = 'YOUR CONSUMER SECRET'
TWITTER_CALLBACK_URL = 'http://localhost:3000/auth/twitter/callback'

```

## Features

Users can do the following:

- Create an account, login or logout
- Browse available products added by the admin
- Add products to the shopping cart
- Delete products from the shopping cart
- Display the shopping cart
- To checkout, a user must be logged in
- Checkout information is processed using stripe and the payment is send to the admin
- The profile contains all the orders a user has made

Admins can do the following:

- Login or logout to the admin panel
- View all the information stored in the database. They can view/add/edit/delete orders, users, products and categories.

## Database

All the models can be found in the models directory created using mongoose.

- User Schema
- Category Schema
- Product Schema
- Order Schema
- Cart Schema
- Promotion Schema
- Stock Schema

## License
[BSD](https://github.com/riahimohamed/server/blob/main/LICENSE)
