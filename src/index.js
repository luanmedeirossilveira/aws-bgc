const express = require("express");
const productsRouter = require('./router/products')
const { notFound } = require('./middleware/index')

const app = express();

app.use(express.json());

// Routers
app.use('/api/products', productsRouter)

// Middlewares
app.use(notFound)

module.exports = app