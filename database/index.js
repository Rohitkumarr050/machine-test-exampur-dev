const mongoose = require('mongoose');
const { serverConfig } = require('../config/serverConfig');
const { addDummyProduct } = require('../utils/dummyData');

function mongooseCon()
{
    try
    {
        mongoose.connect(serverConfig.MONGO_DB_URI, {useNewUrlParser: true });

        mongoose.connection.on('error', (err) =>
        {
            console.log('Mongoose Connection Error: ', err)
            process.exit(1)
        });

        mongoose.connection.on('open', async(err) =>
        {
            if (err)
            {
                console.log("Mongoose Error While Open", err);
            }
            else
            {
                console.log('Mongoose Connection Established', serverConfig.MONGO_DB_URI);
                await addDummyProduct();

            }
        });

        mongoose.connection.on('disconnected', function ()
        {
            console.log('Mongoose Connection Disconnected');
        });
        return;
    }
    catch (e)
    {
        throw new Error(e);
    }
}

module.exports = {mongooseCon};