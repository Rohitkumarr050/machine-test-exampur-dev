const express = require('express');
const http = require('http');
const cors = require('cors');
const { startRoutes } = require('./routes');
const { mongooseCon } = require('./database')
const { serverConfig } = require('./config/serverConfig');
const { addDummyProduct } = require('./utils/dummyData');

const app = express();
const server = http.createServer(app);

const port = serverConfig.port;
server.listen(port);


app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(500).send("Server is Running...");
})

server.on('error', (err) =>
{
    console.error("server connection error, Exiting the process", err);
    process.exit(1);
});

server.on('listening', async () => 
{
    console.log('Listening on port-->> ' + port);
    mongooseCon();
    startRoutes(app);
    await addDummyProduct()
});
