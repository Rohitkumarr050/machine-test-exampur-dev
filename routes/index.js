const express = require('express');
const walletRoute = require("./wallet");
const productRoute = require("./product");


const apiRoutes = express.Router();

apiRoutes.use("/wallet", walletRoute.router);
apiRoutes.use("/products", productRoute.router);


function startRoutes(app) 
{
    app.use('/api', apiRoutes);
}

module.exports = { startRoutes }