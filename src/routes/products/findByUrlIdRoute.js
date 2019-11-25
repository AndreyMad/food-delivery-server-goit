const products = require('../../db/products/all-products.json');
const url = require("url")


const getIdFromUrl = url => {
    const lastIndex = url.lastIndexOf("/");
    if (lastIndex !== -1) {
        return url.substring(lastIndex + 1)
    }
}

const findProd = (req, res) => {

    const parsedUrl = url.parse(req.url).pathname;
    const idFromUrl = getIdFromUrl(parsedUrl)

    const itemToReturn = products.find(el => {
        return el.id === +idFromUrl

    })
    if (itemToReturn) {
        const bodyResponse = {
            status: "success",
            products: itemToReturn
        }
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify(bodyResponse));
        res.end();
    }


}

module.exports = findProd;