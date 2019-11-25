const products = require('../../db/products/all-products.json')
const path = require('path')
const findProductByidproductsRoute = require('./findProductByid')
const findByUrlIdRoute = require('./findByUrlIdRoute')
const getAllProducts = require('./products')
const querystring = require('querystring');

const productsRoute = (req, res) => {
    const productIds = products.map(el => el.id)
    const idFromReq = Number(path.basename(req.url))

    if (req.method === 'GET' && req.url === '/products') {
        getAllProducts(req, res)
    } else if (productIds.includes(idFromReq)) {
        findByUrlIdRoute(req, res)
    }

}

module.exports = productsRoute;