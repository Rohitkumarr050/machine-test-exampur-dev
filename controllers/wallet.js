const { default: mongoose } = require('mongoose');
const { getPoductById } = require('../database/models/product');
const transactionModel = require('../database/models/transaction');
const walletModel = require('../database/models/walletModel');

function setupWallet(input)
{
    return new Promise(async (resolve, reject) =>
    {
        try {
            let { balance, name } = input;

            if (typeof balance != 'number' || balance <= 0) {
                reject({ message: 'Invalid amount' })
                return
            }

            let wallet = await walletModel.getWalletByUserName(name);
            if (wallet) {
                reject({ message: 'wallet Already exist' })
                return;
            }
            let walletObj = {
                userName: name,
                balance: `${parseFloat(balance.toFixed(4))}` ,
                createdAt: new Date()
            }
            let newWallet = await walletModel.addWallet(walletObj);

            let transObj =
            {
                userName: name,
                walletId: newWallet._id,
                transactionType: "credit",
                status: "success",
                amount: `${parseFloat(balance.toFixed(4))}`,
                description: "wallet setup",
                createdAt: new Date()
            }
            const trans = await transactionModel.addtransaction(transObj)

            const data = {
                walletId: newWallet._id,
                balance: Number(newWallet.balance),
                transactionId: trans._id,
                name: name,
                date: newWallet.createdAt
            }
            resolve({ message: 'wallet created successfully', data })
            return;
        }
        catch (error) {
            console.log("Error wallet setup", error)
            reject(error);
        }
    })
}

function getWallet(input)
{
    return new Promise(async (resolve, reject) =>
    {
        try {
            const { walletId } = input
            let wallet = await walletModel.getWalletById(walletId);
            if (!wallet) {
                reject({ message: 'wallet not found', data: null })
            }

            const data = {
                walletId: wallet._id,
                balance: Number(wallet.balance),
                name: wallet.userName,    
                createdAt: wallet.createdAt
            }

            resolve({ message: 'success', data })
            return;
        }
        catch (error) {
            reject(error);
        }
    })
}

function addCredit(input, params)
{
    return new Promise(async (resolve, reject) =>
    {
        try {
            let { amount, description } = input
            const {walletId} = params
            let data;

            if (typeof amount != 'number' || amount <= 0) {
                reject({ message: 'Invalid amount' })
            }
            amount = parseFloat(amount.toFixed(4)) 

            let wallet = await walletModel.getWalletById(walletId);
            if (!wallet) {
                reject({ message: 'wallet not found', data: null })
            }

            let session = await mongoose.startSession()
            try {
                session.startTransaction();
    
                let newBalance = Math.floor((Number(wallet.balance) + amount)*10000)/10000;
    
                let walletObj = {
                    balance: `${parseFloat(newBalance.toFixed(4))}`,
                }
                let res = await walletModel.updateWallet(walletObj, walletId, session);
    
                let transObj =
                {
                    userName: wallet.userName,
                    walletId: walletId,
                    transactionType: "credit",
                    status: "success",
                    amount: `${amount}`,
                    description,
                    createdAt: new Date()
                }
                const trans = await transactionModel.addtransactionWithTransaction(transObj, session);

                let type='';
                let transactionId='';
                let createdAt = '';
                if(trans.length > 0)
                {
                    type = trans[0].transactionType;
                    transactionId = trans[0]._id;
                    createdAt = trans[0].createdAt
                }

                data = {
                    balance: Number(res.balance),
                    transactionId,
                    description,
                    type,
                    createdAt
                }
    
                await session.commitTransaction();
                
            } catch (error) {
                console.log("Transaction Error", error)
                await session.abortTransaction();
                reject({ message: 'fail to add credit'})
            }
            finally
            {
                session.endSession();
            }

            resolve({ message: 'wallet credit successfully', data })
            return;
        }
        catch (error) {
            console.log("Error while adding credit", error)
            reject(error);
        }
    })
}


function getTransactinsByPagination(input)
{
    return new Promise(async (resolve, reject) =>
    {
        try {

            const { walletId, page, limit } = input;

            const transactions = await transactionModel.getTransactionsByFilter(walletId, page, limit);
            resolve({ message: 'success', data: transactions })
            return;
        }
        catch (error) {
            console.log("Error get transaction", error)
            reject(error);
        }
    })
}

function productPurchase(params, input)
{
    return new Promise(async (resolve, reject) =>
    {
        try {
            const { walletId } = params
            const { productId } = input;
            let qty = 1;
            let data = {};

            let product = await getPoductById(productId);
            if (!product) {
                reject({ message: 'product not found', data: null })
            }

            let wallet = await walletModel.getWalletById(walletId);
            if (!wallet) {
                reject({ message: 'wallet not found', data: null })
            }
            
            let productPrice = Number(product.price) * qty;   // multiple qty
            let balance = Number(wallet.balance);

            if (balance <= 1 || productPrice > balance) {
                reject({ message: 'Insufficent balance', data: null })
            }

            let newBalance = Math.floor((balance - productPrice) * 1000) / 1000;

            let session = await mongoose.startSession()
            try {

                session.startTransaction();

                let walletObj = {
                    balance: `${parseFloat(newBalance.toFixed(4))}`,   //
                }
                let walletRes = await walletModel.updateWallet(walletObj, walletId, session);

                let transObj =
                {
                    userName: wallet.userName,
                    walletId: walletId,
                    transactionType: "debit",
                    status: "success",
                    amount: `${productPrice}`,
                    description: `Purchase the product: ${product.name}`,
                    createdAt: new Date()
                }
                const trans = await transactionModel.addtransactionWithTransaction(transObj, session);

                let type='';
                let transactionId='';
                let createdAt = '';
                let description = '';
                if(trans.length > 0)
                {
                    type = trans[0].transactionType;
                    transactionId = trans[0]._id;
                    createdAt = trans[0].createdAt
                    description = trans[0].description
                }

                data = {
                    balance: newBalance,
                    productId,
                    transactionId,
                    description,
                    type,
                    createdAt
                }

                await session.commitTransaction();

            } catch (error) {
                console.log("Transaction Error", error)
                await session.abortTransaction();
                reject({ message: 'fail to purchase item' })
            }
            finally {
                session.endSession();
            }

            resolve({ message: 'success', data })
            return;
        }
        catch (error) {
            console.log("Error purchase", error)
            reject(error);
        }
    })
}

module.exports = { setupWallet, getWallet, addCredit, getTransactinsByPagination, productPurchase }