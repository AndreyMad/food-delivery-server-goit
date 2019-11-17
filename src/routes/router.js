const mainRoute = require('./main');
const products = require('./products');
// const signUpRoute = require('./users/sign-up-route');

const router = {
  '/products': products,
//   '/motocycle': motocycleRoute,
   default: mainRoute
};

module.exports = router;
