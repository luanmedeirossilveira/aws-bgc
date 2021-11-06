const router = require('express').Router()
const { mapProducts, findProducts } = require("../controllers/products")

// Rota para mapear os produtos
router.get('/', mapProducts)

// Rota para buscar todos produtos
router.post('/', findProducts)

module.exports = router