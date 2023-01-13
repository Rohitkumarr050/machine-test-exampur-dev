const walletSchema = require('../schema/wallet');

async function addWallet(wallet)
{
    try {
        let res = await walletSchema.create(wallet);
        return res
    } catch (error) {
        throw error;
    }
}

async function getWalletByUserName(userName)
{
    try {
        let wallet = await walletSchema.findOne({ userName });
        return wallet
    } catch (error) {
        throw error;
    }
}

async function getWalletById(id)
{
    try {
        let wallet = await walletSchema.findById(id);
        return wallet
    } catch (error) {
        throw error;
    }
}

async function updateWallet(updateObj, id, session)
{
    try {
        let wallet = await walletSchema.findByIdAndUpdate(id, updateObj, { new: true , session});
        return wallet
    } catch (error) {
        throw error;
    }
}


module.exports = { addWallet, getWalletByUserName, getWalletById, updateWallet }