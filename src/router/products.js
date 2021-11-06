const router = require('express').Router()
const { mapProducts, findProducts } = require("../controllers/products")

// Rota para mapear os produtos
router.get('/maps', mapProducts)

// Rota para buscar todos produtos
router.get('/finds', findProducts)

module.exports = router