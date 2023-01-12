const productModel = require('../database/models/product');

function getProductList()
{
    return new Promise(async (resolve, reject) =>
    {
        try {

            const productList = await productModel.getAllProducts();

            resolve({ message: 'success', data: productList })
            return;
        }
        catch (error) {
            console.log("Error get productlist", error)
            reject(error);
        }
    })
}


module.exports = { getProductList }