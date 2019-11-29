const products = require('../../db/products/all-products.json')
const path = require('path')
const findProductByidproductsRoute = require('./findProductByid')
const findByUrlIdRoute = require('./findByUrlIdRoute')
const getAllProducts = require('./products')
const querystring = require('querystring');
const findProductByCategory = require('./getProductByCategory')

const productsRoute = (req, res) => {
    const productIds = products.map(el => el.id)
    const idFromReq = Number(path.basename(req.url))

    if (req.method === 'GET' && req.url === '/products') {
        getAllProducts(req, res)
    } else if (productIds.includes(idFromReq)) {
        findByUrlIdRoute(req, res)
    } else if (req.method === 'GET' && req.url.includes('ids')) {
        findProductByidproductsRoute(req, res, 'ids')
    } else if (req.method === 'GET' && req.url.includes('category')) {
        findProductByCategory(req, res, 'category')
    }

}

module.exports = productsRoute;