const transactionSchema = require('../schema/transaction');

async function addtransaction(transactionObj)
{
    try {
        let transaction = await transactionSchema.create(transactionObj);
        return transaction
    } catch (error) {
        throw error;
    }
}

async function addtransactionWithTransaction(transactionObj, session)
{
    try {
        let transaction = await transactionSchema.create([transactionObj], { session });
        return transaction
    } catch (error) {
        throw error;
    }
}

async function getTransactionByUserId(userId)
{
    try {
        let transaction = await transactionSchema.findOne({ userId });
        return transaction
    } catch (error) {
        throw error;
    }
}

async function getTransactionsByFilter(walletId, page, limit)
{
    try {
        let transactions = await transactionSchema.find({ walletId }).skip((page-1) * limit).limit(limit);
        return transactions
    } catch (error) {
        throw error;
    }
}

module.exports = { addtransaction, getTransactionByUserId, getTransactionsByFilter, addtransactionWithTransaction }