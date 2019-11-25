const fs = require('fs');
const path = require('path');
const queryString = require('querystring')
const products = require('../../db/products/all-products.json')


const findProdByIdRoute = async (req, res) => {
    //get ids from url
    const ids = queryString.parse(req.url, '?').ids;
    //remove " ' " from start and end of string
    const newIds = ids.slice(1, ids.length - 1)
    let idsArr = newIds.split(',')
    let bodyResponse;
    let arrayToResponse = []

    idsArr.map(el => {
        const productToResponse = products.find(elem => {
            return elem.id === +el
        });

        if (productToResponse) {
            const obj = {
                id: productToResponse.id,
                sku: productToResponse.sku,
                name: productToResponse.name,
                description: productToResponse.description
            }
            arrayToResponse.push(obj)

        }
        if (arrayToResponse.length > 1) {
            bodyResponse = {
                status: "success",
                products: arrayToResponse
            };
        } else {
            bodyResponse = {
                status: "no such products",
                products: []
            };
            res.writeHead(204, {
                "Content-Type": "application/json"
            });
            res.write(JSON.stringify(bodyResponse));
            res.end();
        }
    });
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(JSON.stringify(bodyResponse));
    res.end();





};

module.exports = findProdByIdRoute;