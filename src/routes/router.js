const mainRoute = require('./main');
const products = require('./products');
const signUpRoute = require('./signUp');

const router = {
  '/products': products,
  '/signUp': signUpRoute,
   default: mainRoute
};

module.exports = router;
