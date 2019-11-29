const queryString = require("querystring");
const products = require("../../db/products/all-products.json");

const findByCategory = async (req, res) => {
  const cat = queryString.parse(req.url, "?").category;

  const allCat = cat.slice(1, cat.length - 1);
  let catArr = allCat.split(",");
  let bodyResponse;
  let arrayToResponse = [];

  catArr.forEach(el => {
    const productToResponse = products.filter(elem => {
      const item = elem.categories.find(categorie => categorie === el);
      return elem.categories.find(categorie => categorie === el);
    });

    if (productToResponse) {
      productToResponse.forEach(el => {
        const obj = {
          id: el.id,
          sku: el.sku,
          name: el.name,
          categories: el.categories,
          description: el.description
        };

        arrayToResponse.push(obj);
      });
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

module.exports = findByCategory;
