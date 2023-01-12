const productSchema = require('../schema/product');

async function addProductList(productList)
{
    try {
        await productSchema.insertMany(productList);
        return
    } catch (error) {
        throw error;
    }
}

async function getProductCount()
{
    try {
        let productCount = await productSchema.countDocuments();
        return productCount
    } catch (error) {
        throw error;
    }
}

async function getAllProducts()
{
    try {
       const products = await productSchema.find().lean();
        return products;
    } catch (error) {
        throw error;
    }
}

async function getPoductById(id)
{
    try {
       const product = await productSchema.findById(id).lean();
        return product;
    } catch (error) {
        throw error;
    }
}
module.exports = { addProductList, getProductCount, getAllProducts, getPoductById }