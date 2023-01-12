const express = require('express');
const { body, param } = require('express-validator');
const productController = require('../controllers/product');

const router = express.Router();

router.get("/", async (req, res) =>
{
    try {
        const data = await productController.getProductList()
        res.status(200).send(data);
    } catch (err) {
        res.status(501).send(err)
    }
});


module.exports = { router }