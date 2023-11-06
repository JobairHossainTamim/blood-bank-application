const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');


// path Identifier
const dbConfig = require('./src/config/dbConfig')

const userRouter = require("./src/modules/User/user.router");
const inventoryRouter = require("./src/modules/Inventory/inventory.router");


// App Required 
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));
app.use(bodyParser.raw({ type: 'application/json' }));

// Api 
app.use('/api/user', userRouter)
app.use('/api/inventory', inventoryRouter)


const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log("Server running on port " + PORT));