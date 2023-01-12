# Node.js, Express and MongoDB Project Structure 
This is a basic project structure to help us to start building RESTful web APIs.

# Project Structure
- index.js : Responsible for connecting the MongoDB and starting the server, Configure everything that has to do with Express application.
- config -> serverConfig.js: for Enviroment Variables
- routes ->  The goal of the route is to take the request data and send to the correct handler function which will be in one of the controllers
- controllers ->  Handle the application request, interact with models and send back the response to the client 
- models ->
   schema: It contain the all the schemas of the application.
   models: Each model contain the queries related to feature.

NOTE:
- To avoid the race condition in wallet mongodb transaction is using.
- mongodb should have replica set To run the transaction with mongodb.

# How to run this project
- Go to root directory and
- Run `npm install` Command
- Then Run `npm start` Command for start this project

# Answer No: 1 
 - Question: Wallet Setup.
 - Method: POST
 - Url: localhost:8085/api/wallet
 - Body Parameter: { "balance": 500.6985, "name": "Test" }
 
# Answer No: 2
- Question:  Wallet Details.
- Method: GET
- Url: localhost:8085/api/wallet/${walletId}

# Answer No: 3 
 - Question :  Add credit to the wallet.
 - Method: POST
 - Body Parameter: { "amount": 1500.1000, "description": "Add credit" }
 - Url: localhost:8085/api/wallet/${walletId}/transaction

# Answer No: 4 
 - Question :  Product Listing
 - Method: GET
 - Url: localhost:8085/api/products

# Answer No: 5
 - Question : Purchase a product.
 - Method: POST
 - Body Parameter: { "productId":"63beaecc2e9ffd8bdc346847"  }
 - Url: localhost:8085/api/wallet/${walletId/purchase

# Answer No: 6
 - Question : List transactions.
 - Method: GET
 - Url: localhost:8085/api/wallet/${walletId}/transaction/1/10
