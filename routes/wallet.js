const express = require('express');
const { body, param } = require('express-validator');
const walletController = require('../controllers/wallet');

const router = express.Router();

router.post("/", async (req, res) =>
{
    try {
        const data = await walletController.setupWallet(req.body)
        res.status(200).send(data);
    } catch (err) {
        res.status(501).send(err)
    }
});


router.get("/:walletId",
    [
        param('walletId').exists().withMessage("walletId not found").isMongoId().withMessage("Invalid walletId"),
    ], async (req, res) =>
{
    try {
        const data = await walletController.getWallet(req.params)
        res.status(200).send(data);
    } catch (err) {
        res.status(501).send(err)
    }
});

router.post("/:walletId/transaction",[
    param('walletId').exists().withMessage("walletId not found").isMongoId().withMessage("Invalid walletId"),
],
 async (req, res) =>
{
    try {
        const data = await walletController.addCredit(req.body, req.params)
        res.status(200).send(data);
    } catch (err) {
        res.status(501).send(err)
    }
});

router.get("/:walletId/transaction/:page/:limit",[
    param('walletId').exists().withMessage("walletId not found").isMongoId().withMessage("Invalid walletId"),
    param('page').exists().withMessage("page not found").toInt(),
    param('limit').exists().withMessage("limit not found").toInt()
],
 async (req, res) =>
{
    try {
        console.log("request")
        const data = await walletController.getTransactinsByPagination(req.params)
        res.status(200).send(data);
    } catch (err) {
        res.status(501).send(err)
    }
});

router.post("/:walletId/purchase",[
    param('walletId').exists().withMessage("walletId not found").isMongoId().withMessage("Invalid walletId"),
],
 async (req, res) =>
{
    try {
        const data = await walletController.productPurchase(req.params, req.body)
        res.status(200).send(data);
    } catch (err) {
        res.status(501).send(err)
    }
});

module.exports = { router }