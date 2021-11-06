const express = require("express");
const serverless = require("serverless-http");
const productsRouter = require('./src/router/products')
const { notFound } = require('./src/middleware/index')

const app = express();

app.use(express.json());

// Routers
app.use('/api/products', productsRouter)

// Middlewares
app.use(notFound)

module.exports.handler = serverless(app);
