const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const products = require("../../db/products/all-products.json");

const findProdByIdRoute = async (req, res) => {
  //get ids from url
  const ids = queryString.parse(req.url, "?").ids;
  //remove " ' " from start and end of string
  const newIds = ids.slice(1, ids.length - 1);
  let idsArr = newIds.split(",");
  let bodyResponse;
  let arrayToResponse = [];

  idsArr.forEach(el => {
    const productToResponse = products.find(elem => {
      return elem.id === +el;
    });

    if (productToResponse) {
      const obj = {
        id: productToResponse.id,
        sku: productToResponse.sku,
        name: productToResponse.name,
        description: productToResponse.description
      };

      arrayToResponse.push(obj);
      console.log(arrayToResponse);
    }
    if (arrayToResponse.length === 0) {
      bodyResponse = {
        status: "no such products",
        products: []
      };
    } else {
      bodyResponse = {
        status: "succes",
        products: arrayToResponse
      };
    }
  });
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.write(JSON.stringify(bodyResponse));
  res.end();
};

module.exports = findProdByIdRoute;
